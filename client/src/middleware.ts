import {logOut, refresh} from "#src/apis/auth";
import {NextRequest, NextResponse} from "next/server";
import {Cookie, Pathname, SessionOption} from "./constants";
import {Session} from "./types/actions/auth";

const getTokens = async (
	req: NextRequest
): Promise<Session["tokens"] | null> => {
	const session = req.cookies.get("session");

	if (!session?.value) {
		return null;
	}

	const {tokens} = JSON.parse(session.value);

	if (!tokens) {
		return null;
	}

	return tokens;
};

const setSession = (session: Session, req: NextRequest): NextResponse => {
	req.cookies.set(Cookie.SESSION, JSON.stringify(session));

	const res = NextResponse.next({request: {headers: req.headers}});
	res.cookies.set(Cookie.SESSION, JSON.stringify(session), {
		httpOnly: SessionOption.HTTP_ONLY,
		maxAge: SessionOption.MAX_AGE,
		secure: SessionOption.IS_SECURE,
		sameSite: SessionOption.SAME_SITE
	});

	return res;
};

const clearSession = async (req: NextRequest) => {
	req.cookies.delete(Cookie.SESSION);

	const res = NextResponse.redirect(new URL(Pathname.LOGIN, req.url));
	res.cookies.delete(Cookie.SESSION);

	return res;
};

const signOut = async (refreshToken: string, req: NextRequest) => {
	try {
		await logOut(refreshToken);
	} catch (e) {
		console.log("Couldn't log out before clearing the session.");
	}

	return clearSession(req);
};

export const middleware = async (req: NextRequest) => {
	const {pathname} = req.nextUrl;

	const tokens = await getTokens(req);

	if (!tokens) {
		return NextResponse.redirect(new URL(Pathname.LOGIN, req.url));
	}

	let res;
	try {
		const data = await refresh(tokens.refresh);
		res = setSession(data, req);
	} catch (e) {
		console.log("Error refreshing token: ", e);
		return signOut(tokens.refresh, req);
	}

	const isSuccessPath = pathname.startsWith(Pathname.SUCCESS);
	if (isSuccessPath) {
		const {searchParams} = req.nextUrl;
		const token = searchParams.get("token");
		const csrfToken = req.cookies.get("csrfToken")?.value;

		if (!token || !csrfToken || token !== csrfToken) {
			return NextResponse.json({message: "Access denied."}, {status: 403});
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
