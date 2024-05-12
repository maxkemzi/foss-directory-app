import {ApiError} from "#src/lib";
import {AuthService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class AuthController {
	static async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const {username, email, password} = req.body;

			const {user, tokens} = await AuthService.signup({
				username,
				email,
				password
			});

			res.status(201).json({user, tokens});
		} catch (e) {
			next(e);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const {email, password} = req.body;

			const {user, tokens} = await AuthService.login({
				email,
				password
			});

			res.json({user, tokens});
		} catch (e) {
			next(e);
		}
	}

	static async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const {refreshToken} = req.cookies;
			if (!refreshToken) {
				throw new ApiError(401, "Unauthorized.");
			}

			const {user, tokens} = await AuthService.refresh(refreshToken);

			res.json({user, tokens});
		} catch (e) {
			next(e);
		}
	}

	static async check(req: Request, res: Response, next: NextFunction) {
		try {
			const {accessToken} = req.body;

			const isValid = await AuthService.check(accessToken);

			res.json(isValid);
		} catch (e) {
			next(e);
		}
	}

	static async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const {refreshToken} = req.cookies;
			if (!refreshToken) {
				throw new ApiError(401, "Unauthorized.");
			}

			await AuthService.logout(refreshToken);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default AuthController;
