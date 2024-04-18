import {NextRequest, NextResponse} from "next/server";
import {AuthApi} from "./apis";
import {Cookie, COOKIE_OPTIONS, Pathname} from "./constants";

const AUTH_PATHNAMES = [Pathname.LOGIN, Pathname.SIGNUP];
const PROTECTED_PATHNAMES = [Pathname.SETTINGS, Pathname.MY_PROJECTS];
const VALID_PATHNAMES = Object.values(Pathname);

const middleware = async (req: NextRequest) => {
	const pathIsAuth = AUTH_PATHNAMES.includes(req.nextUrl.pathname);
	if (pathIsAuth) {
		return NextResponse.next();
	}

	const isSuccessPath = req.nextUrl.pathname === Pathname.SUCCESS;
	if (isSuccessPath) {
		const {searchParams} = req.nextUrl;
		const token = searchParams.get("token");
		const csrfToken = req.cookies.get("csrfToken")?.value;

		if (!token || !csrfToken || token !== csrfToken) {
			return NextResponse.json({message: "Access denied."}, {status: 403});
		}

		const response = NextResponse.next();
		response.cookies.delete("csrfToken");
		return response;
	}

	const isAuth = Boolean(req.cookies.get(Cookie.USER)?.value);
	const pathIsProtected = PROTECTED_PATHNAMES.includes(req.nextUrl.pathname);
	if (!isAuth && pathIsProtected) {
		return NextResponse.redirect(new URL(Pathname.LOGIN, req.url));
	}

	const refreshToken = req.cookies.get("refreshToken")?.value;
	const pathIsValid = VALID_PATHNAMES.includes(req.nextUrl.pathname);
	if (refreshToken && pathIsValid) {
		try {
			const {user, tokens} = await AuthApi.refresh(refreshToken);

			const response = NextResponse.next();
			response.cookies.set(Cookie.USER, JSON.stringify(user), {
				...COOKIE_OPTIONS,
				httpOnly: false
			});
			response.cookies.set(Cookie.ACCESS_TOKEN, tokens.access, COOKIE_OPTIONS);
			response.cookies.set(
				Cookie.REFRESH_TOKEN,
				tokens.refresh,
				COOKIE_OPTIONS
			);
			return response;
		} catch (e) {
			console.log(e);

			const response = NextResponse.redirect(new URL(Pathname.LOGIN, req.url));
			response.cookies.delete(Cookie.USER);
			response.cookies.delete(Cookie.ACCESS_TOKEN);
			response.cookies.delete(Cookie.REFRESH_TOKEN);
			return response;
		}
	}

	return NextResponse.next();
};

export {middleware};
