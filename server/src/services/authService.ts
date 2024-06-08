import {db, refreshTokenModel, userModel} from "#src/db";
import {UserDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import bcryptjs from "bcryptjs";
import jwtService from "./jwtService";

const signUp = async ({username, email, password}: any) => {
	const client = await db.getClient();

	try {
		const candidateByUsername = await userModel.findByUsername(
			client,
			username
		);
		if (candidateByUsername) {
			throw new ApiError(400, "User with provided username already exists");
		}

		const candidateByEmail = await userModel.findByEmail(client, email);
		if (candidateByEmail) {
			throw new ApiError(400, "User with provided email already exists");
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const user = await userModel.insert(client, {
			username,
			email,
			password: hashedPassword
		});

		const userDto = new UserDto(user);
		const tokens = jwtService.generateAccessAndRefreshTokens({...userDto});

		await refreshTokenModel.upsert(client, {
			userId: userDto.id,
			token: tokens.refresh
		});

		return {user: {...userDto}, tokens};
	} finally {
		client.release();
	}
};

const logIn = async ({email, password}: any) => {
	const client = await db.getClient();

	try {
		const user = await userModel.findByEmail(client, email);
		if (!user) {
			throw new ApiError(400, "User with provided email doesn't exist");
		}

		const passwordsMatch = await bcryptjs.compare(password, user.password);
		if (!passwordsMatch) {
			throw new ApiError(400, "Wrong password");
		}

		const userDto = new UserDto(user);
		const tokens = jwtService.generateAccessAndRefreshTokens({...userDto});

		await refreshTokenModel.upsert(client, {
			userId: userDto.id,
			token: tokens.refresh
		});

		return {user: {...userDto}, tokens};
	} finally {
		client.release();
	}
};

const refresh = async (refreshToken: string) => {
	const client = await db.getClient();

	try {
		const userPayload = jwtService.verifyRefreshToken<UserDto>(refreshToken);
		const tokenFromDb = await refreshTokenModel.findByToken(
			client,
			refreshToken
		);
		if (!userPayload || !tokenFromDb) {
			throw new ApiError(401, "Invalid token");
		}

		const user = await userModel.findById(client, userPayload.id);
		if (!user) {
			throw new ApiError(400, "User doesn't exist");
		}

		const userDto = new UserDto(user);
		const accessToken = jwtService.generateAccessToken({...userDto});

		return {
			user: {...userDto},
			tokens: {access: accessToken, refresh: refreshToken}
		};
	} finally {
		client.release();
	}
};

const logOut = async (refreshToken: string) => {
	const client = await db.getClient();

	try {
		await refreshTokenModel.deleteByToken(client, refreshToken);
	} finally {
		client.release();
	}
};

export default {logIn, logOut, refresh, signUp};
