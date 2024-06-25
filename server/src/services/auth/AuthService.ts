import {Db, RefreshTokenModel, UserModel} from "#src/db";
import {ApiError} from "#src/lib";
import bcryptjs from "bcryptjs";
import {ExtendedUserDto} from "../dtos";
import {UserExtender} from "../extenders";
import JwtService from "../jwt/JwtService";

class AuthService {
	static async signUp({username, email, password}: any) {
		const client = await Db.getClient();

		const userModel = new UserModel(client);
		const refreshTokenModel = new RefreshTokenModel(client);

		try {
			const candidateByUsername = await userModel.findByUsername(username);
			if (candidateByUsername) {
				throw new ApiError(400, "User with provided username already exists");
			}

			const candidateByEmail = await userModel.findByEmail(email);
			if (candidateByEmail) {
				throw new ApiError(400, "User with provided email already exists");
			}

			const hashedPassword = await bcryptjs.hash(password, 10);
			const user = await userModel.insert({
				username,
				email,
				password: hashedPassword
			});

			const extender = new UserExtender(client);
			const extendedUser = await extender.extend(user);

			const userDto = new ExtendedUserDto(extendedUser);
			const tokens = JwtService.generateAccessAndRefreshTokens({...userDto});

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
				throw new ApiError(400, "User with provided email doesn't exist");
			}

			const passwordsMatch = await bcryptjs.compare(password, user.password);
			if (!passwordsMatch) {
				throw new ApiError(400, "Wrong password");
			}

			const extender = new UserExtender(client);
			const extendedUser = await extender.extend(user);

			const userDto = new ExtendedUserDto(extendedUser);
			const tokens = JwtService.generateAccessAndRefreshTokens({...userDto});

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
				JwtService.verifyRefreshToken<ExtendedUserDto>(refreshToken);
			const tokenFromDb = await refreshTokenModel.findByToken(refreshToken);
			if (!userPayload || !tokenFromDb) {
				throw new ApiError(401, "Invalid token");
			}

			const user = await userModel.findById(userPayload.id);
			if (!user) {
				throw new ApiError(400, "User doesn't exist");
			}

			const extender = new UserExtender(client);
			const extendedUser = await extender.extend(user);

			const userDto = new ExtendedUserDto(extendedUser);
			const accessToken = JwtService.generateAccessToken({...userDto});

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
