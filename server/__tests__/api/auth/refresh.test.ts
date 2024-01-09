import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "#src/app";
import {RefreshTokenModel, UserModel, UserPayload} from "#src/db/models";
import {UserDto} from "#src/dtos";

const setup = async (user: UserPayload) => {
	const hashedPassword = await bcryptjs.hash(user.password, 10);
	const userFromDb = await UserModel.create({
		...user,
		password: hashedPassword
	});
	const userFromDbDto = new UserDto(userFromDb);

	const refreshToken = jwt.sign(
		{...userFromDbDto},
		process.env.JWT_REFRESH_SECRET as string
	);
	await RefreshTokenModel.create({
		user_id: userFromDbDto.id,
		token: refreshToken
	});

	return {refreshToken, userFromDb};
};

describe("POST /api/auth/refresh", () => {
	test("successful token refresh", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};
		const {refreshToken} = await setup(user);

		const response = await request(app)
			.post("/api/auth/refresh")
			.set("Cookie", [`refreshToken=${refreshToken}`])
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(200);
		expect(response.body).toEqual({
			tokens: {
				access: expect.any(String),
				refresh: expect.any(String)
			},
			user: {id: expect.any(Number), username: user.username, email: user.email}
		});
	});

	test("invalid refresh token", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};
		await setup(user);

		const response = await request(app)
			.post("/api/auth/refresh")
			.set("Cookie", ["refreshToken=invalid_token"])
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(401);
		expect(response.body).toEqual({
			error: "Invalid token."
		});
	});

	test("user doesn't exist anymore", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};
		const {refreshToken, userFromDb} = await setup(user);

		await UserModel.deleteById(userFromDb.id);
		const response = await request(app)
			.post("/api/auth/refresh")
			.set("Cookie", [`refreshToken=${refreshToken}`])
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(401);
		expect(response.body).toEqual({
			error: "Invalid token."
		});
	});

	test("no refresh token cookie", async () => {
		const response = await request(app)
			.post("/api/auth/refresh")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(401);
		expect(response.body).toEqual({error: "Unauthorized."});
	});
});
