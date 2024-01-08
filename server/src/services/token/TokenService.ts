import jwt from "jsonwebtoken";

class TokenService {
	static ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
	static REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

	static generateAccessAndRefresh(payload: string | object) {
		return {
			access: TokenService.#generateAccess(payload),
			refresh: TokenService.#generateRefresh(payload)
		};
	}

	static #generateAccess(payload: string | object) {
		return jwt.sign(payload, TokenService.ACCESS_SECRET, {
			expiresIn: "30m"
		});
	}

	static #generateRefresh(payload: string | object) {
		return jwt.sign(payload, TokenService.REFRESH_SECRET, {
			expiresIn: "30d"
		});
	}

	static verifyAccess<T>(token: string) {
		try {
			const payload = jwt.verify(token, TokenService.ACCESS_SECRET) as T;
			return payload;
		} catch (e) {
			return null;
		}
	}

	static verifyRefresh<T>(token: string) {
		try {
			const payload = jwt.verify(token, TokenService.REFRESH_SECRET) as T;
			return payload;
		} catch (e) {
			return null;
		}
	}
}

export default TokenService;
