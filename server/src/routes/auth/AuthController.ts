import {ErrorFactory} from "#src/lib";
import {AuthService} from "#src/services";
import {
	LogInRequestHandler,
	LogoutRequestHandler,
	RefreshRequestHandler,
	SignUpRequestHandler
} from "./types";

class AuthController {
	static signUp: SignUpRequestHandler = async (req, res, next) => {
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
	};

	static logIn: LogInRequestHandler = async (req, res, next) => {
		try {
			const {email, password} = req.body;

			const {user, tokens} = await AuthService.logIn({email, password});

			res.json({user, tokens});
		} catch (e) {
			next(e);
		}
	};

	static refresh: RefreshRequestHandler = async (req, res, next) => {
		try {
			const {refreshToken} = req.cookies;
			if (!refreshToken) {
				throw ErrorFactory.getUnauthorized();
			}

			const {user, tokens} = await AuthService.refresh(refreshToken);

			res.json({user, tokens});
		} catch (e) {
			next(e);
		}
	};

	static logOut: LogoutRequestHandler = async (req, res, next) => {
		try {
			const {refreshToken} = req.cookies;
			if (!refreshToken) {
				throw ErrorFactory.getUnauthorized();
			}

			await AuthService.logOut(refreshToken);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	};
}

export default AuthController;
