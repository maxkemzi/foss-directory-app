import {env} from "#src/config";
import {Db, RefreshTokenModel, UserModel} from "#src/db";
import {ErrorFactory} from "#src/lib";
import {
	JwtGenerator,
	JwtVerificator,
	MailSender,
	PasswordHasher
} from "#src/services/lib";
import {ApiErrorInfo} from "foss-directory-shared";
import {ExtendedUserDto} from "../dtos";
import {UserExtender} from "../extenders";
import {AuthSession, LogInPayload, SignUpPayload} from "./types";

class AuthService {
	static async signUp(payload: SignUpPayload) {
		const {username, email} = payload;

		const client = await Db.getClient();

		const userModel = new UserModel(client);

		try {
			const candidateByUsername = await userModel.findByUsername(username);
			if (candidateByUsername) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.AUTH_EXISTING_USERNAME);
			}

			const candidateByEmail = await userModel.findByEmail(email);
			if (candidateByEmail) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.AUTH_EXISTING_EMAIL);
			}
		} finally {
			client.release();
		}

		const token = JwtGenerator.generateEmail(payload);
		const url = `${env.PUBLIC_SERVER_URL}/api/auth/verify-email/${token}`;

		await MailSender.send({
			to: email,
			subject: "Email verification.",
			html: `<a href="${url}">Click here to verify your email</a>`
		});
	}

	static async verifyEmail(token: string): Promise<AuthSession> {
		const payload = JwtVerificator.verifyEmail<SignUpPayload>(token);
		if (!payload) {
			throw ErrorFactory.getUnauthorized();
		}

		const {username, email, password} = payload;

		const client = await Db.getClient();

		const userModel = new UserModel(client);
		const refreshTokenModel = new RefreshTokenModel(client);

		try {
			await client.query("BEGIN");

			const hashedPassword = await PasswordHasher.hash(password);
			const user = await userModel.insert({
				username,
				email,
				password: hashedPassword
			});

			const extender = new UserExtender(client);
			const extendedUser = await extender.extend(user);

			const userDto = new ExtendedUserDto(extendedUser);
			const tokens = JwtGenerator.generateAccessAndRefresh({...userDto});

			await refreshTokenModel.upsert({
				userId: userDto.id,
				token: tokens.refresh
			});

			await client.query("COMMIT");

			return {user: {...userDto}, tokens};
		} catch (e) {
			await client.query("ROLLBACK");
			throw e;
		} finally {
			client.release();
		}
	}

	static async logIn(payload: LogInPayload) {
		const {email, password} = payload;

		const client = await Db.getClient();

		const userModel = new UserModel(client);
		const refreshTokenModel = new RefreshTokenModel(client);

		try {
			const user = await userModel.findByEmail(email);
			if (!user) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.AUTH_NON_EXISTING_EMAIL);
			}

			const passwordsMatch = await PasswordHasher.compare(
				password,
				user.password
			);
			if (!passwordsMatch) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.AUTH_WRONG_PASSWORD);
			}

			const extender = new UserExtender(client);
			const extendedUser = await extender.extend(user);

			const userDto = new ExtendedUserDto(extendedUser);
			const tokens = JwtGenerator.generateAccessAndRefresh({...userDto});

			await refreshTokenModel.upsert({
				userId: userDto.id,
				token: tokens.refresh
			});

			return {user: {...userDto}, tokens};
		} finally {
			client.release();
		}
	}

	static async refresh(refreshToken: string) {
		const client = await Db.getClient();

		const userModel = new UserModel(client);
		const refreshTokenModel = new RefreshTokenModel(client);

		try {
			const userPayload =
				JwtVerificator.verifyRefresh<ExtendedUserDto>(refreshToken);
			const tokenFromDb = await refreshTokenModel.findByToken(refreshToken);
			if (!userPayload || !tokenFromDb) {
				throw ErrorFactory.getUnauthorized(ApiErrorInfo.AUTH_INVALID_TOKEN);
			}

			const user = await userModel.findById(userPayload.id);
			if (!user) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.USER_NOT_FOUND);
			}

			const extender = new UserExtender(client);
			const extendedUser = await extender.extend(user);

			const userDto = new ExtendedUserDto(extendedUser);
			const accessToken = JwtGenerator.generateAccess({...userDto});

			return {
				user: {...userDto},
				tokens: {access: accessToken, refresh: refreshToken}
			};
		} finally {
			client.release();
		}
	}

	static async logOut(refreshToken: string) {
		const client = await Db.getClient();

		const refreshTokenModel = new RefreshTokenModel(client);

		try {
			await refreshTokenModel.deleteByToken(refreshToken);
		} finally {
			client.release();
		}
	}
}

export default AuthService;
