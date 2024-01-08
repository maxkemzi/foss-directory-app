import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import request from "supertest";
import {describe, expect, test} from "vitest";
import app from "../../../src/app.ts";
import {RefreshTokenModel, UserModel} from "../../../src/db/models/index.ts";
import UserDto from "../../../src/dtos/UserDto.ts";

const setup = async user => {
	const hashedPassword = await bcryptjs.hash(user.password, 10);
	const userFromDb = await UserModel.create({
		...user,
		password: hashedPassword
	});
	const userFromDbDto = new UserDto(userFromDb);

	const refreshToken = jwt.sign(
		{...userFromDbDto},
		process.env.JWT_REFRESH_SECRET
	);
	await RefreshTokenModel.create({
		user_id: userFromDbDto.id,
		token: refreshToken
	});

	return {refreshToken};
};

describe("POST /api/auth/logout", () => {
	test("successful user logout", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};
		const {refreshToken} = await setup(user);

		const response = await request(app)
			.post("/api/auth/logout")
			.set("Cookie", [`refreshToken=${refreshToken}`])
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(200);
		expect(response.body).toEqual({
			message: "Successfully logged out."
		});
	});

	test("no refresh token cookie", async () => {
		const response = await request(app)
			.post("/api/auth/logout")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(401);
		expect(response.body).toEqual({error: "Unauthorized."});
	});
});
