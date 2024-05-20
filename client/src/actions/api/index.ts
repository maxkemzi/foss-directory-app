"use server";

import {ApiError} from "#src/lib";

const {API_URL} = process.env;

const fetchApi = async (url: string, options: RequestInit = {}) => {
	const response = await fetch(`${API_URL}${url}`, {
		cache: "no-store",
		...options
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new ApiError(
			response.status || 404,
			errorData.error || "Something went wrong."
		);
	}

	return response;
};

export {fetchApi};
