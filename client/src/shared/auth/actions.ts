"use server";

import {Pathname} from "#src/shared/constants";
import {ApiCookie, SessionFromApi} from "foss-directory-shared";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {fetchApi} from "../apis";
import authApi, {LoginBody} from "../apis/auth";
import {isApiError} from "../apis/lib";
import {AppError} from "../error";

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

const logIn = async (data: LoginBody) => {
	const response = await authApi.logIn(data);
	await setServerAuthCookies(response.session, response.refreshToken);
};

const logOut = async () => {
	const refreshToken = await getServerRefreshToken();

	if (!refreshToken) {
		redirect(Pathname.LOGIN);
	}

	try {
		await authApi.logOut(refreshToken);
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error logging out";
		throw new AppError(message);
	}

	await clearServerAuthCookies();

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
			Authorization: `Bearer ${session.accessToken}`
		},
		...restOpts
	});
	return response;
};

export {
	clearServerAuthCookies,
	fetchApiWithAuth,
	getServerSession,
	logIn,
	logOut,
	setServerAuthCookies
};
