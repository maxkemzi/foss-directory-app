import {NextRequest, NextResponse} from "next/server";
import {AuthApi} from "./api";
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

	const isSuccessRoute = req.nextUrl.pathname === Route.SUCCESS;
	if (isSuccessRoute) {
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
	const routeIsProtected = PROTECTED_ROUTES.includes(req.nextUrl.pathname);
	if (!isAuth && routeIsProtected) {
		return NextResponse.redirect(new URL(Route.LOGIN, req.url));
	}

	const refreshToken = req.cookies.get("refreshToken")?.value;
	const isAppRoute = APP_ROUTES.includes(req.nextUrl.pathname);
	if (refreshToken && isAppRoute) {
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

			const response = NextResponse.redirect(new URL(Route.LOGIN, req.url));
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
