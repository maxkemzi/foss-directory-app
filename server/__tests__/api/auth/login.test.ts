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
};

describe("POST /api/auth/login", () => {
	test("successful user login", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};
		await setup(user);

		const response = await request(app)
			.post("/api/auth/login")
			.send({email: user.email, password: user.password})
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

	test("user with provided email doesn't exist", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};

		const response = await request(app)
			.post("/api/auth/login")
			.send({email: user.email, password: user.password})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: "User with provided email doesn't exist."
		});
	});

	test("wrong password", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};
		await setup(user);

		const response = await request(app)
			.post("/api/auth/login")
			.send({email: user.email, password: "password2"})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: "Wrong password."
		});
	});
});
