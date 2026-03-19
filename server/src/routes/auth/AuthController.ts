import {env} from "#src/config";
import {ErrorFactory} from "#src/lib";
import {AuthService} from "#src/services";
import {ApiCookie} from "foss-directory-shared";
import {
	LogInRequestHandler,
	LogoutRequestHandler,
	RefreshRequestHandler,
	SignUpRequestHandler,
	VerifyEmailRequestHandler
} from "./types";

class AuthController {
	private static SESSION_COOKIE_OPTIONS = {
		...ApiCookie.SESSION.options,
		secure: env.HTTPS_ENABLED
	};

	private static REFRESH_TOKEN_COOKIE_OPTIONS = {
		...ApiCookie.REFRESH_TOKEN.options,
		secure: env.HTTPS_ENABLED
	};

	static signUp: SignUpRequestHandler = async (req, res, next) => {
		try {
			const {username, email, password} = req.body;

			await AuthService.signUp({username, email, password});

			res.status(200).json({success: true});
		} catch (e) {
			next(e);
		}
	};

	static verifyEmail: VerifyEmailRequestHandler = async (req, res, next) => {
		try {
			const {token} = req.params;

			const {user, tokens} = await AuthService.verifyEmail(token);

			res.cookie(
				ApiCookie.SESSION.name,
				JSON.stringify({user, accessToken: tokens.access}),
				this.SESSION_COOKIE_OPTIONS
			);
			res.cookie(
				ApiCookie.REFRESH_TOKEN.name,
				tokens.refresh,
				this.REFRESH_TOKEN_COOKIE_OPTIONS
			);
			res.redirect(env.PUBLIC_CLIENT_URL);
		} catch (e) {
			next(e);
		}
	};

	static logIn: LogInRequestHandler = async (req, res, next) => {
		try {
			const {email, password} = req.body;

			const {user, tokens} = await AuthService.logIn({email, password});

			res.cookie(
				ApiCookie.SESSION.name,
				JSON.stringify({user, accessToken: tokens.access}),
				this.SESSION_COOKIE_OPTIONS
			);
			res.cookie(
				ApiCookie.REFRESH_TOKEN.name,
				tokens.refresh,
				this.REFRESH_TOKEN_COOKIE_OPTIONS
			);
			res.json({success: true});
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

			res.cookie(
				ApiCookie.SESSION.name,
				JSON.stringify({user, accessToken: tokens.access}),
				this.SESSION_COOKIE_OPTIONS
			);
			res.json({success: true});
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

			res.clearCookie(ApiCookie.SESSION.name);
			res.clearCookie(ApiCookie.REFRESH_TOKEN.name);
			res.json({success: true});
		} catch (e) {
			next(e);
		}
	};
}

export default AuthController;
