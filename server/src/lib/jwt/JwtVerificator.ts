import {env} from "#src/config";
import jwt from "jsonwebtoken";

class JwtVerificator {
	private static ACCESS_SECRET = env.JWT_ACCESS_SECRET;
	private static REFRESH_SECRET = env.JWT_REFRESH_SECRET;
	private static CSRF_SECRET = env.JWT_CSRF_SECRET;
	private static EMAIL_SECRET = env.JWT_EMAIL_SECRET;

	static verifyAccess<T>(token: string) {
		return this.verify<T>(token, this.ACCESS_SECRET);
	}

	static verifyRefresh<T>(token: string) {
		return this.verify<T>(token, this.REFRESH_SECRET);
	}

	static verifyCsrf<T>(token: string) {
		return this.verify<T>(token, this.CSRF_SECRET);
	}

	static verifyEmail<T>(token: string) {
		return this.verify<T>(token, this.EMAIL_SECRET);
	}

	private static verify<T>(token: string, secret: string) {
		try {
			const payload = jwt.verify(token, secret) as T;
			return payload;
		} catch (e) {
			return null;
		}
	}
}

export default JwtVerificator;
