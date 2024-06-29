import {Db, RefreshTokenModel, UserModel} from "#src/db";
import {ErrorFactory} from "#src/lib";
import {JwtGenerator, JwtVerificator, PasswordHasher} from "#src/services/lib";
import {ApiErrorInfo} from "foss-directory-shared";
import {ExtendedUserDto} from "../dtos";
import {UserExtender} from "../extenders";

class AuthService {
	static async signUp({username, email, password}: any) {
		const client = await Db.getClient();

		const userModel = new UserModel(client);
		const refreshTokenModel = new RefreshTokenModel(client);

		try {
			const candidateByUsername = await userModel.findByUsername(username);
			if (candidateByUsername) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.AUTH_EXISTING_USERNAME);
			}

			const candidateByEmail = await userModel.findByEmail(email);
			if (candidateByEmail) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.AUTH_EXISTING_EMAIL);
			}

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

			return {user: {...userDto}, tokens};
		} finally {
			client.release();
		}
	}

	static async logIn({email, password}: any) {
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
