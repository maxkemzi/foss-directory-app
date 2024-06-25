import {env} from "#src/config";
import jwt from "jsonwebtoken";

class JwtService {
	private static ACCESS_SECRET = env.JWT_ACCESS_SECRET;
	private static REFRESH_SECRET = env.JWT_REFRESH_SECRET;
	private static CSRF_SECRET = env.JWT_CSRF_SECRET;

	static generateAccessAndRefreshTokens(payload: string | object) {
		return {
			access: this.generateAccessToken(payload),
			refresh: this.generateRefreshToken(payload)
		};
	}

	static generateAccessToken(payload: string | object) {
		return jwt.sign(payload, this.ACCESS_SECRET, {
			expiresIn: "30m"
		});
	}

	static generateRefreshToken(payload: string | object) {
		return jwt.sign(payload, this.REFRESH_SECRET, {
			expiresIn: "30d"
		});
	}

	static generateCsrfToken(payload: string | object) {
		return jwt.sign(payload, this.CSRF_SECRET, {
			expiresIn: "10m"
		});
	}

	static verifyAccessToken<T>(token: string) {
		return this.verifyToken<T>(token, this.ACCESS_SECRET);
	}

	static verifyRefreshToken<T>(token: string) {
		return this.verifyToken<T>(token, this.REFRESH_SECRET);
	}

	static verifyCsrfToken<T>(token: string) {
		return this.verifyToken<T>(token, this.CSRF_SECRET);
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
