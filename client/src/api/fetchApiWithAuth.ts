"use server";

import {COOKIE_OPTIONS} from "#src/constants";
import {cookies} from "next/headers";
import ApiError from "./ApiError";
import fetchApi from "./fetchApi";
import requestRefresh from "./requestRefresh";

const fetchApiWithAuth = async (
	url: string,
	options: RequestInit & {isRetry?: boolean} = {}
): Promise<Response> => {
	const cookieStore = cookies();

	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;
	if (!accessToken || !refreshToken) {
		throw new ApiError(401, "Not authorized.");
	}

	const response = await fetchApi(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (response.status === 401 && !options.isRetry) {
		// eslint-disable-next-line no-param-reassign
		options.isRetry = true;

		try {
			const {user, tokens} = await requestRefresh(refreshToken);
			cookieStore.set("user", JSON.stringify(user), COOKIE_OPTIONS);
			cookieStore.set("accessToken", tokens.access, COOKIE_OPTIONS);
			cookieStore.set("refreshToken", tokens.refresh, COOKIE_OPTIONS);
			cookieStore.set("isAuth", "true", COOKIE_OPTIONS);

			const retryResponse = await fetchApiWithAuth(url, options);
			return retryResponse;
		} catch (e) {
			cookieStore.delete("user");
			cookieStore.delete("accessToken");
			cookieStore.delete("refreshToken");
			cookieStore.delete("isAuth");

			throw e;
		}
	}

	return response;
};

export default fetchApiWithAuth;
