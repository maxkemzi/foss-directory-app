"use server";

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

	if (!response.ok) {
		const errorData = await response.json();
		throw new ApiError(
			response.status || 404,
			errorData.error || "Something went wrong"
		);
	}

	return response;
};

export {fetchApi};
