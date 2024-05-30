"use server";

import {Cookie, Pathname} from "#src/shared/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Session} from "./types";
import {SessionOption} from "./constants";
import {LoginBody, fetchLogIn, fetchLogOut} from "../api/auth";
import {fetchApi} from "../api";

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

const logIn = async (data: LoginBody) => {
	const session = await fetchLogIn(data);
	await setServerSession(session);
};

const logOut = async () => {
	const session = await getServerSession();

	if (!session) {
		redirect(Pathname.LOGIN);
	}

	try {
		await fetchLogOut(session.tokens.refresh);
	} catch (e) {
		console.log("Error logging out");
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
		return logOut();
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
	clearServerSession,
	fetchApiWithAuth,
	getServerSession,
	logIn,
	logOut,
	setServerSession
};
