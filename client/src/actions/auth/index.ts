"use server";

import {logIn, logOut} from "#src/apis/auth";
import {fetchApi} from "#src/actions/api";
import {Cookie, Pathname, SessionOption} from "#src/constants";
import {LoginBody} from "#src/types/apis/auth";
import {Session} from "#src/types/actions/auth";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const getServerSession = async (): Promise<Session | null> => {
	const cookieStore = cookies();
	const session = cookieStore.get(Cookie.SESSION);

	if (!session?.value) {
		return null;
	}

	return JSON.parse(session.value);
};

const setServerSession = async (session: Session) => {
	const cookieStore = cookies();
	cookieStore.set(Cookie.SESSION, JSON.stringify(session), {
		httpOnly: SessionOption.HTTP_ONLY,
		maxAge: SessionOption.MAX_AGE,
		secure: SessionOption.IS_SECURE,
		sameSite: SessionOption.SAME_SITE
	});
};

const clearServerSession = async () => {
	const cookieStore = cookies();
	cookieStore.delete(Cookie.SESSION);
};

const signIn = async (data: LoginBody) => {
	const session = await logIn(data);
	await setServerSession(session);
};

const signOut = async () => {
	const session = await getServerSession();

	if (!session) {
		redirect(Pathname.LOGIN);
	}

	try {
		await logOut(session.tokens.refresh);
	} catch (e) {
		console.log("Error logging out.");
	}

	await clearServerSession();

	redirect(Pathname.LOGIN);
};

const fetchApiWithAuth = async (
	url: string,
	options: RequestInit = {}
): Promise<Response> => {
	const session = await getServerSession();

	if (!session) {
		return signOut();
	}

	const response = await fetchApi(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${session.tokens.access}`
		}
	});
	return response;
};

export {
	getServerSession,
	setServerSession,
	clearServerSession,
	signIn,
	signOut,
	fetchApiWithAuth
};
