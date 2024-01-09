import {NextFunction, Request, Response} from "express";
import {AuthService} from "#src/services";

class AuthController {
	static async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const {username, email, password} = req.body;

			const {user, tokens} = await AuthService.signup({
				username,
				email,
				password
			});

			res.cookie("refreshToken", tokens.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
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

			res.cookie("refreshToken", tokens.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			res.json({user, tokens});
		} catch (e) {
			next(e);
		}
	}

	static async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const {refreshToken} = req.cookies;

			const {user, tokens} = await AuthService.refresh(refreshToken);

			res.cookie("refreshToken", tokens.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			res.json({user, tokens});
		} catch (e) {
			next(e);
		}
	}

	static async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const {refreshToken} = req.cookies;

			await AuthService.logout(refreshToken);

			res.clearCookie("refreshToken");
			res.json({message: "Successfully logged out."});
		} catch (e) {
			next(e);
		}
	}
}

export default AuthController;
