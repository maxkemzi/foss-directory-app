import ApiError from "./ApiError";

interface CustomResponse<T = any> extends Response {
	data: T;
}

const fetchApi = <T = any>(
	url: string,
	options?: RequestInit
): Promise<CustomResponse<T>> => {
	return new Promise(async (resolve, reject) => {
		const {headers = {}, ...restOptions} = options || {};
		const response = await fetch(`${process.env.API_URL}${url}`, {
			headers: {
				"Content-Type": "application/json",
				...headers
			},
			...restOptions
		});

		const data = await response.json();

		if (!response.ok) {
			reject(
				new ApiError(
					response.status || 404,
					data?.error || "Something went wrong."
				)
			);
		} else {
			resolve({...response, data});
		}
	});
};

export default fetchApi;
