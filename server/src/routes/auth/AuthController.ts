import {ApiError} from "#src/lib";
import {AuthService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class AuthController {
	static async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			const {username, email, password} = req.body;

			const {user, tokens} = await AuthService.signUp({
				username,
				email,
				password
			});

			res.status(201).json({user, tokens});
		} catch (e) {
			next(e);
		}
	}

	static async logIn(req: Request, res: Response, next: NextFunction) {
		try {
			const {email, password} = req.body;

			const {user, tokens} = await AuthService.logIn({email, password});

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

	static async logOut(req: Request, res: Response, next: NextFunction) {
		try {
			const {refreshToken} = req.cookies;
			if (!refreshToken) {
				throw new ApiError(401, "Unauthorized.");
			}

			await AuthService.logOut(refreshToken);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default AuthController;
