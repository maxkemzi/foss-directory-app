import {Cookie, COOKIE_OPTIONS} from "#src/constants";
import {deleteAuthCookiesFromStore} from "#src/helpers";
import {cookies} from "next/headers";
import ApiError from "./ApiError";

class ApiFetcher {
	private baseUrl: string;

	constructor(url: string) {
		this.baseUrl = `${process.env.API_URL}${url}`;
	}

	async fetch(url: string, options: RequestInit = {}) {
		const response = await fetch(`${this.baseUrl}${url}`, options);

		if (!response.ok) {
			const errorData = await response.json();
			throw new ApiError(
				response.status || 404,
				errorData.error || "Something went wrong."
			);
		}

		return response;
	}

	async fetchWithAuth(
		url: string,
		options: RequestInit & {isRetry?: boolean} = {}
	): Promise<Response> {
		const cookieStore = cookies();

		const accessToken = cookieStore.get("accessToken")?.value;
		const refreshToken = cookieStore.get("refreshToken")?.value;
		if (!accessToken || !refreshToken) {
			throw new ApiError(401, "Not authorized.");
		}

		const response = await this.fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (response.status === 401 && !options.isRetry) {
			try {
				const refreshResponse = await this.fetch("/auth/refresh", {
					method: "POST",
					headers: {Cookie: `refreshToken=${refreshToken}`},
					cache: "no-store"
				});
				const {user, tokens} = await refreshResponse.json();

				cookieStore.set(Cookie.USER, JSON.stringify(user), {
					...COOKIE_OPTIONS,
					httpOnly: false
				});
				cookieStore.set(Cookie.ACCESS_TOKEN, tokens.access, COOKIE_OPTIONS);
				cookieStore.set(Cookie.REFRESH_TOKEN, tokens.refresh, COOKIE_OPTIONS);

				const retryResponse = await this.fetchWithAuth(url, {
					...options,
					isRetry: true
				});
				return retryResponse;
			} catch (e) {
				deleteAuthCookiesFromStore(cookieStore);

				throw e;
			}
		}

		return response;
	}
}

export default ApiFetcher;
