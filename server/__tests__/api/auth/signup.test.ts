import request from "supertest";
import app from "#src/app";
import {UserModel} from "#src/db/models";

describe("POST /api/auth/signup", () => {
	test("successful user signup", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};

		const response = await request(app)
			.post("/api/auth/signup")
			.send(user)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(201);
		expect(response.body).toEqual({
			tokens: {
				access: expect.any(String),
				refresh: expect.any(String)
			},
			user: {
				id: expect.any(Number),
				username: user.username,
				email: user.email,
				githubIsConnected: false
			}
		});
	});

	test("user with provided username already exists", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};

		await UserModel.create({
			username: user.username,
			email: "u2@gmail.com",
			password: "password"
		});
		const response = await request(app)
			.post("/api/auth/signup")
			.send(user)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: "User with provided username already exists."
		});
	});

	test("user with provided email already exists", async () => {
		const user = {
			username: "username",
			email: "u@gmail.com",
			password: "password"
		};

		await UserModel.create({
			username: "username2",
			email: user.email,
			password: "password"
		});
		const response = await request(app)
			.post("/api/auth/signup")
			.send(user)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.type).toEqual("application/json");
		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			error: "User with provided email already exists."
		});
	});
});
