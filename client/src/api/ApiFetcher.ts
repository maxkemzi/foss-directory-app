import {COOKIE_OPTIONS} from "#src/constants";
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
		options: RequestInit & {isRetry?: boolean}
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
			// eslint-disable-next-line no-param-reassign
			options.isRetry = true;

			try {
				const refreshResponse = await this.fetch("/auth/refresh", {
					method: "POST",
					headers: {Cookie: `refreshToken=${refreshToken}`},
					cache: "no-store"
				});
				const {user, tokens} = await refreshResponse.json();

				cookieStore.set("user", JSON.stringify(user), COOKIE_OPTIONS);
				cookieStore.set("accessToken", tokens.access, COOKIE_OPTIONS);
				cookieStore.set("refreshToken", tokens.refresh, COOKIE_OPTIONS);
				cookieStore.set("isAuth", "true", COOKIE_OPTIONS);

				const retryResponse = await this.fetchWithAuth(url, options);
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
	}
}

export default ApiFetcher;
