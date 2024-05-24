import {RefreshTokenModel, UserModel} from "#src/db/models";
import {UserDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import bcryptjs from "bcryptjs";
import JwtTokensService from "./JwtTokensService";

class AuthService {
	static async signup({username, email, password}: any) {
		const candidateByUsername = await UserModel.getByUsername(username);
		if (candidateByUsername) {
			throw new ApiError(400, "User with provided username already exists.");
		}

		const candidateByEmail = await UserModel.getByEmail(email);
		if (candidateByEmail) {
			throw new ApiError(400, "User with provided email already exists.");
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const user = await UserModel.create({
			username,
			email,
			password: hashedPassword
		});

		const userDto = new UserDto(user);
		const tokens = JwtTokensService.generateAccessAndRefresh({...userDto});

		await RefreshTokenModel.upsert({
			userId: userDto.id,
			token: tokens.refresh
		});

		return {user: {...userDto}, tokens};
	}

	static async login({email, password}: any) {
		const user = await UserModel.getByEmail(email);
		if (!user) {
			throw new ApiError(400, "User with provided email doesn't exist.");
		}

		const passwordsMatch = await bcryptjs.compare(password, user.password);
		if (!passwordsMatch) {
			throw new ApiError(400, "Wrong password.");
		}

		const userDto = new UserDto(user);
		const tokens = JwtTokensService.generateAccessAndRefresh({...userDto});

		await RefreshTokenModel.upsert({
			userId: userDto.id,
			token: tokens.refresh
		});

		return {user: {...userDto}, tokens};
	}

	static async refresh(refreshToken: string) {
		const userPayload = JwtTokensService.verifyRefresh<UserDto>(refreshToken);
		const tokenFromDb = await RefreshTokenModel.getByToken(refreshToken);
		if (!userPayload || !tokenFromDb) {
			throw new ApiError(401, "Invalid token.");
		}

		const user = await UserModel.getById(userPayload.id);
		if (!user) {
			throw new ApiError(400, "User doesn't exist.");
		}

		const userDto = new UserDto(user);
		const accessToken = JwtTokensService.generateAccess({...userDto});

		return {
			user: {...userDto},
			tokens: {access: accessToken, refresh: refreshToken}
		};
	}

	static async logout(refreshToken: string) {
		await RefreshTokenModel.deleteByToken(refreshToken);
	}
}

export default AuthService;
