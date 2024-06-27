import {env} from "#src/config";
import jwt from "jsonwebtoken";

class JwtGenerator {
	private static ACCESS_SECRET = env.JWT_ACCESS_SECRET;
	private static REFRESH_SECRET = env.JWT_REFRESH_SECRET;
	private static CSRF_SECRET = env.JWT_CSRF_SECRET;

	static generateAccessAndRefresh(payload: string | object) {
		return {
			access: this.generateAccess(payload),
			refresh: this.generateRefresh(payload)
		};
	}

	static generateAccess(payload: string | object) {
		return jwt.sign(payload, this.ACCESS_SECRET, {
			expiresIn: "30m"
		});
	}

	static generateRefresh(payload: string | object) {
		return jwt.sign(payload, this.REFRESH_SECRET, {
			expiresIn: "30d"
		});
	}

	static generateCsrf(payload: string | object) {
		return jwt.sign(payload, this.CSRF_SECRET, {
			expiresIn: "10m"
		});
	}
}

export default JwtGenerator;
