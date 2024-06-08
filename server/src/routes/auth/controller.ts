import {ApiError} from "#src/lib";
import {authService} from "#src/services";
import {NextFunction, Request, Response} from "express";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {username, email, password} = req.body;

		const {user, tokens} = await authService.signUp({
			username,
			email,
			password
		});

		res.status(201).json({user, tokens});
	} catch (e) {
		next(e);
	}
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {email, password} = req.body;

		const {user, tokens} = await authService.logIn({email, password});

		res.json({user, tokens});
	} catch (e) {
		next(e);
	}
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {refreshToken} = req.cookies;
		if (!refreshToken) {
			throw new ApiError(401, "Unauthorized.");
		}

		const {user, tokens} = await authService.refresh(refreshToken);

		res.json({user, tokens});
	} catch (e) {
		next(e);
	}
};

const logOut = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {refreshToken} = req.cookies;
		if (!refreshToken) {
			throw new ApiError(401, "Unauthorized.");
		}

		await authService.logOut(refreshToken);

		res.json({success: true});
	} catch (e) {
		next(e);
	}
};

export default {logIn, logOut, refresh, signUp};
