import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {requestCheck, requestRefresh} from "./api";
import {
	APP_ROUTES,
	AUTH_ROUTES,
	COOKIE_OPTIONS,
	PROTECTED_ROUTES,
	Route
} from "./constants";

const middleware = async (req: NextRequest) => {
	const routeIsAuth = AUTH_ROUTES.includes(req.nextUrl.pathname);
	if (routeIsAuth) {
		return NextResponse.next();
	}

	const accessToken = cookies().get("accessToken")?.value;
	const routeIsProtected = PROTECTED_ROUTES.includes(req.nextUrl.pathname);
	if (!accessToken && routeIsProtected) {
		return NextResponse.redirect(new URL(Route.LOGIN, req.url));
	}

	const isAppRoute = APP_ROUTES.includes(req.nextUrl.pathname);
	if (accessToken && isAppRoute) {
		try {
			const tokenIsValid = await requestCheck();
			if (tokenIsValid) {
				return NextResponse.next();
			}

			const {user, tokens} = await requestRefresh();

			const response = NextResponse.next();
			response.cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);
			response.cookies.set("accessToken", tokens.access, COOKIE_OPTIONS);
			response.cookies.set("refreshToken", tokens.refresh, COOKIE_OPTIONS);
			response.cookies.set("isAuth", "true", COOKIE_OPTIONS);
			return response;
		} catch (e) {
			console.log(e);
			return NextResponse.redirect(new URL(Route.LOGIN, req.url));
		}
	}

	return NextResponse.next();
};

export {middleware};
