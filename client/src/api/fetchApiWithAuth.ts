import {COOKIE_OPTIONS} from "#src/constants";
import {cookies} from "next/headers";
import ApiError from "./ApiError";
import fetchApi from "./fetchApi";

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
		options.isRetry = true;

		try {
			const refreshResponse = await fetch(
				`${process.env.API_URL}/auth/refresh`,
				{
					method: "POST",
					headers: {Cookie: `refreshToken=${refreshToken}`},
					cache: "no-store"
				}
			);

			if (!refreshResponse.ok) {
				throw new Error();
			}

			const {user, tokens} = await refreshResponse.json();
			cookieStore.set("user", JSON.stringify(user), COOKIE_OPTIONS);
			cookieStore.set("accessToken", tokens.access, COOKIE_OPTIONS);
			cookieStore.set("refreshToken", tokens.refresh, COOKIE_OPTIONS);
			cookieStore.set("isAuth", "true", COOKIE_OPTIONS);

			const retryResponse = await fetchApiWithAuth(url, options);
			return retryResponse;
		} catch (e) {
			throw new ApiError(401, "Not authorized.");
		}
	}

	if (!response.ok) {
		const errorData = await response.json();
		throw new ApiError(
			response.status || 404,
			errorData.error || "Something went wrong."
		);
	}

	return response;
};

export default fetchApiWithAuth;
