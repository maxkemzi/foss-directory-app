import JwtGenerator from "#src/lib/jwt/JwtGenerator";
import jwt from "jsonwebtoken";
import {Mock} from "vitest";

vi.mock("#src/config", () => ({
	env: {
		JWT_ACCESS_SECRET: "testAccessSecret",
		JWT_REFRESH_SECRET: "testRefreshSecret",
		JWT_CSRF_SECRET: "testCsrfSecret",
		JWT_EMAIL_SECRET: "testEmailSecret"
	}
}));

vi.mock("jsonwebtoken");

const mockSign = jwt.sign as Mock;

describe("JwtGenerator", () => {
	let payload: {userId: number};
	const accessSecret = "testAccessSecret";
	const refreshSecret = "testRefreshSecret";
	const csrfSecret = "testCsrfSecret";
	const emailSecret = "testEmailSecret";

	beforeEach(() => {
		payload = {userId: 123};
		vi.clearAllMocks();
	});

	describe("generateAccessAndRefresh", () => {
		it("should generate access and refresh tokens", () => {
			mockSign
				.mockReturnValueOnce("accessToken")
				.mockReturnValueOnce("refreshToken");

			const result = JwtGenerator.generateAccessAndRefresh(payload);

			expect(mockSign).toHaveBeenCalledTimes(2);
			expect(mockSign).toHaveBeenCalledWith(payload, accessSecret, {
				expiresIn: "30m"
			});
			expect(mockSign).toHaveBeenCalledWith(payload, refreshSecret, {
				expiresIn: "30d"
			});

			expect(result).toEqual({
				access: "accessToken",
				refresh: "refreshToken"
			});
		});
	});

	describe("generateAccess", () => {
		it("should generate an access token", () => {
			mockSign.mockReturnValue("accessToken");

			const result = JwtGenerator.generateAccess(payload);

			expect(mockSign).toHaveBeenCalledWith(payload, accessSecret, {
				expiresIn: "30m"
			});
			expect(result).toBe("accessToken");
		});
	});

	describe("generateRefresh", () => {
		it("should generate a refresh token", () => {
			mockSign.mockReturnValue("refreshToken");

			const result = JwtGenerator.generateRefresh(payload);

			expect(mockSign).toHaveBeenCalledWith(payload, refreshSecret, {
				expiresIn: "30d"
			});
			expect(result).toBe("refreshToken");
		});
	});

	describe("generateCsrf", () => {
		it("should generate a CSRF token", () => {
			mockSign.mockReturnValue("csrfToken");

			const result = JwtGenerator.generateCsrf(payload);

			expect(mockSign).toHaveBeenCalledWith(payload, csrfSecret, {
				expiresIn: "10m"
			});
			expect(result).toBe("csrfToken");
		});
	});

	describe("generateEmail", () => {
		it("should generate an email token", () => {
			mockSign.mockReturnValue("emailToken");

			const result = JwtGenerator.generateEmail(payload);

			expect(mockSign).toHaveBeenCalledWith(payload, emailSecret, {
				expiresIn: "1d"
			});
			expect(result).toBe("emailToken");
		});
	});
});
