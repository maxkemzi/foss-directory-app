import authApi from "#src/shared/apis/auth";
import {ApiCookie, SessionFromApi} from "foss-directory-shared";
import {NextRequest, NextResponse} from "next/server";
import {Pathname} from "./shared/constants";

const getRefreshToken = async (req: NextRequest): Promise<string | null> => {
	const refreshToken = req.cookies.get(ApiCookie.REFRESH_TOKEN.name);

	if (!refreshToken?.value) {
		return null;
	}

	return refreshToken.value;
};

const updateSession = (
	session: SessionFromApi,
	req: NextRequest
): NextResponse => {
	req.cookies.set(ApiCookie.SESSION.name, JSON.stringify(session));

	const res = NextResponse.next({request: {headers: req.headers}});
	res.cookies.set(ApiCookie.SESSION.name, JSON.stringify(session), {
		...ApiCookie.SESSION.options,
		secure: false
	});

	return res;
};

const clearAuthCookies = async (req: NextRequest) => {
	req.cookies.delete([ApiCookie.SESSION.name, ApiCookie.REFRESH_TOKEN.name]);

	const res = NextResponse.redirect(new URL(Pathname.LOGIN, req.url));
	res.cookies.delete(ApiCookie.SESSION.name);
	res.cookies.delete(ApiCookie.REFRESH_TOKEN.name);

	return res;
};

const logOut = async (refreshToken: string, req: NextRequest) => {
	try {
		await authApi.logOut(refreshToken);
	} catch (e) {
		console.log("Couldn't log out before clearing the session");
	}

	return clearAuthCookies(req);
};

export const middleware = async (req: NextRequest) => {
	const {pathname} = req.nextUrl;

	const refreshToken = await getRefreshToken(req);

	if (!refreshToken) {
		return NextResponse.redirect(new URL(Pathname.LOGIN, req.url));
	}

	let res = NextResponse.next();
	try {
		const {session} = await authApi.refresh(refreshToken);
		res = updateSession(session, req);
	} catch (e) {
		console.log("Error refreshing token: ", e);
		return logOut(refreshToken, req);
	}

	const isSuccessPath = pathname.startsWith(Pathname.SUCCESS);
	if (isSuccessPath) {
		const {searchParams} = req.nextUrl;
		const token = searchParams.get("token");
		const csrfToken = req.cookies.get("csrfToken")?.value;

		if (!token || !csrfToken || token !== csrfToken) {
			return NextResponse.json({message: "Access denied"}, {status: 403});
		}

		res.cookies.delete("csrfToken");
	}

	return res;
};

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - auth (auth routes)
		 */
		`/((?!api|_next/static|_next/image|favicon.ico|auth).*)`
	]
};
