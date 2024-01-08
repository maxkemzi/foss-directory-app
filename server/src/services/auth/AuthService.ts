import bcryptjs from "bcryptjs";
import {RefreshToken, RefreshTokenModel, UserModel} from "../../db/models";
import {UserDto} from "../../dtos";
import {ApiError} from "../../lib";
import TokenService from "../token/TokenService";

class AuthService {
	static async signup({username, email, password}: any) {
		const candidateByUsername = await UserModel.findByUsername(username);
		if (candidateByUsername) {
			throw new ApiError(400, "User with provided username already exists.");
		}

		const candidateByEmail = await UserModel.findByEmail(email);
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
		const tokens = TokenService.generateAccessAndRefresh({...userDto});

		await RefreshTokenModel.create({
			user_id: userDto.id,
			token: tokens.refresh
		});

		return {user: {...userDto}, tokens};
	}

	static async login({email, password}: any) {
		const user = await UserModel.findByEmail(email);
		if (!user) {
			throw new ApiError(400, "User with provided email doesn't exist.");
		}

		const passwordsMatch = await bcryptjs.compare(password, user.password);
		if (!passwordsMatch) {
			throw new ApiError(400, "Wrong password.");
		}

		const userDto = new UserDto(user);
		const tokens = TokenService.generateAccessAndRefresh({...userDto});

		await RefreshTokenModel.updateByUserId(userDto.id, {
			user_id: userDto.id,
			token: tokens.refresh
		});

		return {user: {...userDto}, tokens};
	}

	static async refresh(refreshToken: RefreshToken["token"]) {
		const userPayload = TokenService.verifyRefresh<UserDto>(refreshToken);
		const tokenFromDb = await RefreshTokenModel.findByToken(refreshToken);
		if (!userPayload || !tokenFromDb) {
			throw new ApiError(401, "Invalid token.");
		}

		const user = await UserModel.findById(userPayload.id);
		if (!user) {
			throw new ApiError(400, "User doesn't exist anymore.");
		}

		const userDto = new UserDto(user);
		const tokens = TokenService.generateAccessAndRefresh({...userDto});

		await RefreshTokenModel.updateByUserId(userDto.id, {
			user_id: userDto.id,
			token: tokens.refresh
		});

		return {user: {...userDto}, tokens};
	}

	static async logout(refreshToken: RefreshToken["token"]) {
		await RefreshTokenModel.deleteByToken(refreshToken);
	}
}

export default AuthService;
