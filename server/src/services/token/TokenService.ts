import jwt from "jsonwebtoken";

class TokenService {
	static #ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
	static #REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
	static #CSRF_SECRET = process.env.JWT_CSRF_SECRET as string;

	static generateAccessAndRefresh(payload: string | object) {
		return {
			access: TokenService.#generateAccess(payload),
			refresh: TokenService.#generateRefresh(payload)
		};
	}

	static #generateAccess(payload: string | object) {
		return jwt.sign(payload, TokenService.#ACCESS_SECRET, {
			expiresIn: "30m"
		});
	}

	static #generateRefresh(payload: string | object) {
		return jwt.sign(payload, TokenService.#REFRESH_SECRET, {
			expiresIn: "30d"
		});
	}

	static generateCSRF(payload: string | object) {
		return jwt.sign(payload, TokenService.#CSRF_SECRET, {
			expiresIn: "10m"
		});
	}

	static verifyAccess<T>(token: string) {
		return TokenService.#verify<T>(token, TokenService.#ACCESS_SECRET);
	}

	static verifyRefresh<T>(token: string) {
		return TokenService.#verify<T>(token, TokenService.#REFRESH_SECRET);
	}

	static verifyCSRF<T>(token: string) {
		return TokenService.#verify<T>(token, TokenService.#CSRF_SECRET);
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

export default TokenService;
