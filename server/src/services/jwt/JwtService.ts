import jwt from "jsonwebtoken";

class JwtService {
	static generateAccessAndRefreshTokens(payload: string | object) {
		return {
			access: JwtService.generateAccessToken(payload),
			refresh: JwtService.generateRefreshToken(payload)
		};
	}

	static generateAccessToken(payload: string | object) {
		const {ACCESS_SECRET} = JwtService.getSecrets();
		return jwt.sign(payload, ACCESS_SECRET, {
			expiresIn: "30m"
		});
	}

	static generateRefreshToken(payload: string | object) {
		const {REFRESH_SECRET} = JwtService.getSecrets();
		return jwt.sign(payload, REFRESH_SECRET, {
			expiresIn: "30d"
		});
	}

	static generateCsrfToken(payload: string | object) {
		const {CSRF_SECRET} = JwtService.getSecrets();
		return jwt.sign(payload, CSRF_SECRET, {
			expiresIn: "10m"
		});
	}

	static verifyAccessToken<T>(token: string) {
		const {ACCESS_SECRET} = JwtService.getSecrets();
		return JwtService.verifyToken<T>(token, ACCESS_SECRET);
	}

	static verifyRefreshToken<T>(token: string) {
		const {REFRESH_SECRET} = JwtService.getSecrets();
		return JwtService.verifyToken<T>(token, REFRESH_SECRET);
	}

	static verifyCsrfToken<T>(token: string) {
		const {CSRF_SECRET} = JwtService.getSecrets();
		return JwtService.verifyToken<T>(token, CSRF_SECRET);
	}

	private static getSecrets() {
		const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_CSRF_SECRET} =
			process.env;

		if (!JWT_ACCESS_SECRET) {
			throw new Error("JWT_ACCESS_SECRET environment variable is not set.");
		}

		if (!JWT_REFRESH_SECRET) {
			throw new Error("JWT_REFRESH_SECRET environment variable is not set.");
		}

		if (!JWT_CSRF_SECRET) {
			throw new Error("JWT_CSRF_SECRET environment variable is not set.");
		}

		return {
			ACCESS_SECRET: JWT_ACCESS_SECRET,
			REFRESH_SECRET: JWT_REFRESH_SECRET,
			CSRF_SECRET: JWT_CSRF_SECRET
		};
	}

	private static verifyToken<T>(token: string, secret: string) {
		try {
			const payload = jwt.verify(token, secret) as T;
			return payload;
		} catch (e) {
			return null;
		}
	}
}

export default JwtService;
