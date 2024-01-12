import {NextRequest, NextResponse} from "next/server";
import {requestCheck, requestRefresh} from "./api";
import {PROTECTED_ROUTES, Route} from "./constants";

const middleware = async (req: NextRequest) => {
	const accessToken = req.cookies.get("accessToken")?.value;
	const routeIsProtected = PROTECTED_ROUTES.includes(req.nextUrl.pathname);

	if (!accessToken && routeIsProtected) {
		return NextResponse.redirect(new URL(Route.LOGIN, req.url));
	}

	if (accessToken && routeIsProtected) {
		const headers = new Headers(req.headers);

		try {
			const tokenIsValid = await requestCheck(accessToken);
			if (tokenIsValid) {
				headers.set("Authorization", `Bearer ${accessToken}`);
				return NextResponse.next({request: {headers}});
			}

			const refreshToken = req.cookies.get("refreshToken")?.value!;
			const {
				data: {user, tokens}
			} = await requestRefresh(refreshToken);

			headers.set("Authorization", `Bearer ${tokens.access}`);
			const response = NextResponse.next({request: {headers}});

			const cookieOptions = {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000};
			response.cookies.set("user", JSON.stringify(user), cookieOptions);
			response.cookies.set("accessToken", tokens.access, cookieOptions);
			response.cookies.set("refreshToken", tokens.refresh, cookieOptions);

			return response;
		} catch (e) {
			return NextResponse.redirect(new URL(Route.LOGIN, req.url));
		}
	}
};

export {middleware};
