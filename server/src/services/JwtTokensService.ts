import jwt from "jsonwebtoken";

class JwtTokensService {
	static #ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
	static #REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
	static #CSRF_SECRET = process.env.JWT_CSRF_SECRET as string;

	static generateAccessAndRefresh(payload: string | object) {
		return {
			access: JwtTokensService.generateAccess(payload),
			refresh: JwtTokensService.#generateRefresh(payload)
		};
	}

	static generateAccess(payload: string | object) {
		return jwt.sign(payload, JwtTokensService.#ACCESS_SECRET, {
			expiresIn: "30m"
		});
	}

	static #generateRefresh(payload: string | object) {
		return jwt.sign(payload, JwtTokensService.#REFRESH_SECRET, {
			expiresIn: "30d"
		});
	}

	static generateCsrf(payload: string | object) {
		return jwt.sign(payload, JwtTokensService.#CSRF_SECRET, {
			expiresIn: "10m"
		});
	}

	static verifyAccess<T>(token: string) {
		return JwtTokensService.#verify<T>(token, JwtTokensService.#ACCESS_SECRET);
	}

	static verifyRefresh<T>(token: string) {
		return JwtTokensService.#verify<T>(token, JwtTokensService.#REFRESH_SECRET);
	}

	static verifyCsrf<T>(token: string) {
		return JwtTokensService.#verify<T>(token, JwtTokensService.#CSRF_SECRET);
	}

	static #verify<T>(token: string, secret: string) {
		try {
			const payload = jwt.verify(token, secret) as T;
			return payload;
		} catch (e) {
			return null;
		}
	}
}

export default JwtTokensService;
