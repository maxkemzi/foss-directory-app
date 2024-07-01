import {ApiCookie, SessionFromApi} from "foss-directory-shared";
import {getCookieValue, decodeCookieValue, parseCookieValue} from "../helpers";

const getSessionFromCookies = (cookies: string[]) => {
	const session = getCookieValue(ApiCookie.SESSION.name, cookies);
	if (session === null) {
		throw new Error(`'${ApiCookie.SESSION.name}' cookie is missing.`);
	}

	const decodedSession = decodeCookieValue(session);
	if (decodedSession === null) {
		throw new Error(`Error decoding '${ApiCookie.SESSION.name}' cookie.`);
	}

	const parsedSession = parseCookieValue<SessionFromApi>(decodedSession);
	if (parsedSession === null) {
		throw new Error(`Error parsing '${ApiCookie.SESSION.name}' cookie.`);
	}

	return parsedSession;
};

const getRefreshTokenFromCookies = (cookies: string[]) => {
	const refreshToken = getCookieValue(ApiCookie.REFRESH_TOKEN.name, cookies);
	if (!refreshToken) {
		throw new Error(`'${ApiCookie.REFRESH_TOKEN.name}' cookie is missing.`);
	}

	const decodedRefreshToken = decodeCookieValue(refreshToken);
	if (decodedRefreshToken === null) {
		throw new Error(`Error decoding '${ApiCookie.REFRESH_TOKEN.name}' cookie.`);
	}

	return decodedRefreshToken;
};

export {getSessionFromCookies, getRefreshTokenFromCookies};
