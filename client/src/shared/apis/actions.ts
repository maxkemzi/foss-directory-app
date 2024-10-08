"use server";

import {getServerSession} from "../auth";
import {getUrlString} from "./helpers";
import ApiError from "./lib/ApiError";
import {SearchParams} from "./types";

const {API_URL} = process.env;

const fetchApi = async (
	url: string,
	opts: RequestInit & {params?: SearchParams} = {}
) => {
	const {params, ...restOpts} = opts;

	const completeUrl = getUrlString(`${API_URL}${url}`, {params});
	const response = await fetch(completeUrl, restOpts);

	console.log(response);

	if (!response.ok) {
		const errorData = await response.json();
		throw new ApiError(
			response.status || 404,
			errorData.error || "Something went wrong"
		);
	}

	return response;
};

const withRetry = <Args extends any[], Return extends Response>(
	fetchFn: (...args: Args) => Promise<Return>,
	retries = 3,
	backoff = 1000
) => {
	return async (...args: Args): Promise<Return> => {
		try {
			const response = await fetchFn(...args);
			return response;
		} catch (e) {
			if (retries > 0) {
				await new Promise(resolve => {
					setTimeout(resolve, backoff);
				});
				return withRetry(fetchFn, retries - 1, backoff * 2)(...args);
			}

			throw e;
		}
	};
};

const withAuth = <Args extends Parameters<typeof fetchApi>>(
	fetchFn: (...args: Args) => Promise<Response>
) => {
	return async (...args: Args) => {
		const updatedArgs: Args = [...args];

		const session = await getServerSession();
		if (session) {
			updatedArgs[1] = {
				...updatedArgs[1],
				headers: {
					...updatedArgs[1]?.headers,
					Authorization: `Bearer ${session.accessToken}`
				}
			};
		}

		return fetchFn(...updatedArgs);
	};
};

export {fetchApi, withRetry, withAuth};
