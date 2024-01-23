import ApiError from "./ApiError";

const fetchApi = async (url: string, options: RequestInit = {}) => {
	const response = await fetch(`${process.env.API_URL}${url}`, options);

	if (!response.ok) {
		const errorData = await response.json();
		throw new ApiError(
			response.status || 404,
			errorData.error || "Something went wrong."
		);
	}

	return response;
};

export default fetchApi;
