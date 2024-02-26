import {NextRequest, NextResponse} from "next/server";
import {AuthApi} from "./api";
import {COOKIE_OPTIONS, Pathname} from "./constants";

const AUTH_PATHNAMES = [Pathname.LOGIN, Pathname.SIGNUP];
const PROTECTED_PATHNAMES = [Pathname.SETTINGS];
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
		const CSRFToken = req.cookies.get("CSRFToken")?.value;

		if (!token || !CSRFToken || token !== CSRFToken) {
			return NextResponse.json({message: "Access denied."}, {status: 403});
		}

		const response = NextResponse.next();
		response.cookies.delete("CSRFToken");
		return response;
	}

	const isAuth = req.cookies.get("isAuth")?.value;
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
			response.cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);
			response.cookies.set("accessToken", tokens.access, COOKIE_OPTIONS);
			response.cookies.set("refreshToken", tokens.refresh, COOKIE_OPTIONS);
			response.cookies.set("isAuth", "true", COOKIE_OPTIONS);
			return response;
		} catch (e) {
			console.log(e);

			const response = NextResponse.redirect(new URL(Pathname.LOGIN, req.url));
			response.cookies.delete("user");
			response.cookies.delete("accessToken");
			response.cookies.delete("refreshToken");
			response.cookies.delete("isAuth");
			return response;
		}
	}

	return NextResponse.next();
};

export {middleware};
