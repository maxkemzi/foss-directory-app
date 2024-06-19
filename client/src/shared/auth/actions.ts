"use server";

import {Cookie, Pathname} from "#src/shared/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Session} from "./types";
import {SessionOption} from "./constants";
import {fetchApi} from "../apis";
import authApi, {LoginBody} from "../apis/auth";

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
	const response = await authApi.logIn(data);
	await setServerSession(response.data);
};

const logOut = async () => {
	const session = await getServerSession();

	if (!session) {
		redirect(Pathname.LOGIN);
	}

	try {
		await authApi.logOut(session.tokens.refresh);
	} catch (e) {
		console.log("Error logging out");
	}

	await clearServerSession();

	redirect(Pathname.LOGIN);
};

type Args = Parameters<typeof fetchApi>;

const fetchApiWithAuth = async (
	url: Args[0],
	opts: Args[1] = {}
): Promise<Response> => {
	const {headers, ...restOpts} = opts;

	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	const response = await fetchApi(url, {
		headers: {
			...headers,
			Authorization: `Bearer ${session.tokens.access}`
		},
		...restOpts
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
