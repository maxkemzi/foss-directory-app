import JwtVerificator from "#src/lib/jwt/JwtVerificator";
import jwt from "jsonwebtoken";
import {Mock} from "vitest";

vi.spyOn(jwt, "verify");
vi.mock("jsonwebtoken", async importOriginal => {
	const original = await importOriginal<typeof import("jsonwebtoken")>();
	return {...original, verify: vi.fn()};
});

const mockVerify = jwt.verify as Mock;

describe("JwtVerificator", () => {
	let payload: {userId: number};
	const accessSecret = "access";
	const refreshSecret = "refresh";
	const csrfSecret = "csrf";
	const emailSecret = "email";

	beforeEach(() => {
		payload = {userId: 123};
		vi.clearAllMocks();
	});

	describe("verifyAccess", () => {
		let accessToken: string;

		beforeEach(() => {
			accessToken = jwt.sign(payload, accessSecret);
		});

		it("should return valid token payload", () => {
			const result = JwtVerificator.verifyAccess(accessToken);

			expect(mockVerify).toHaveBeenCalledOnce();
			expect(mockVerify).toHaveBeenCalledWith(accessToken, accessSecret);
			expect(result).toMatchObject(payload);
		});

		it("should return null when token is invalid", () => {
			const result = JwtVerificator.verifyAccess("invalid token");

			expect(mockVerify).toHaveBeenCalledOnce();
			expect(mockVerify).toHaveBeenCalledWith("invalid token", accessSecret);
			expect(result).toBeNull();
		});
	});

	describe("verifyRefresh", () => {
		let refreshToken: string;

		beforeEach(() => {
			refreshToken = jwt.sign(payload, refreshSecret);
		});

		it("should return valid token payload", () => {
			const result = JwtVerificator.verifyRefresh(refreshToken);

			expect(mockVerify).toHaveBeenCalledOnce();
			expect(mockVerify).toHaveBeenCalledWith(refreshToken, refreshSecret);
			expect(result).toMatchObject(payload);
		});

		it("should return null when token is invalid", () => {
			const result = JwtVerificator.verifyRefresh("invalid token");

			expect(mockVerify).toHaveBeenCalledOnce();
			expect(mockVerify).toHaveBeenCalledWith("invalid token", refreshSecret);
			expect(result).toBeNull();
		});
	});

	describe("verifyCsrf", () => {
		let csrfToken: string;

		beforeEach(() => {
			csrfToken = jwt.sign(payload, csrfSecret);
		});

		it("should return valid token payload", () => {
			const result = JwtVerificator.verifyCsrf(csrfToken);

			expect(mockVerify).toHaveBeenCalledOnce();
			expect(mockVerify).toHaveBeenCalledWith(csrfToken, csrfSecret);
			expect(result).toMatchObject(payload);
		});

		it("should return null when token is invalid", () => {
			const result = JwtVerificator.verifyCsrf("invalid token");

			expect(mockVerify).toHaveBeenCalledOnce();
			expect(mockVerify).toHaveBeenCalledWith("invalid token", csrfSecret);
			expect(result).toBeNull();
		});
	});

	describe("verifyEmail", () => {
		let emailToken: string;

		beforeEach(() => {
			emailToken = jwt.sign(payload, emailSecret);
		});

		it("should return valid token payload", () => {
			const result = JwtVerificator.verifyEmail(emailToken);

			expect(mockVerify).toHaveBeenCalledOnce();
			expect(mockVerify).toHaveBeenCalledWith(emailToken, emailSecret);
			expect(result).toMatchObject(payload);
		});

		it("should return null when token is invalid", () => {
			const result = JwtVerificator.verifyEmail("invalid token");

			expect(mockVerify).toHaveBeenCalledOnce();
			expect(mockVerify).toHaveBeenCalledWith("invalid token", emailSecret);
			expect(result).toBeNull();
		});
	});
});
