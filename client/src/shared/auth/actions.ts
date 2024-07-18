"use server";

import {ApiCookie, SessionFromApi} from "foss-directory-shared";
import {cookies} from "next/headers";

const getServerSession = async (): Promise<SessionFromApi | null> => {
	const cookieStore = cookies();
	const session = cookieStore.get(ApiCookie.SESSION.name);

	if (!session?.value) {
		return null;
	}

	return JSON.parse(session.value);
};

const getServerRefreshToken = async (): Promise<string | null> => {
	const cookieStore = cookies();
	const refreshToken = cookieStore.get(ApiCookie.REFRESH_TOKEN.name);

	if (!refreshToken?.value) {
		return null;
	}

	return refreshToken.value;
};

const setServerAuthCookies = async (
	session: SessionFromApi,
	refreshToken: string
) => {
	const cookieStore = cookies();
	cookieStore.set(
		ApiCookie.SESSION.name,
		JSON.stringify(session),
		ApiCookie.SESSION.options
	);
	cookieStore.set(
		ApiCookie.REFRESH_TOKEN.name,
		refreshToken,
		ApiCookie.REFRESH_TOKEN.options
	);
};

const clearServerAuthCookies = async () => {
	const cookieStore = cookies();
	cookieStore.delete(ApiCookie.REFRESH_TOKEN.name);
	cookieStore.delete(ApiCookie.SESSION.name);
};

export {
	clearServerAuthCookies,
	getServerSession,
	setServerAuthCookies,
	getServerRefreshToken
};
