interface CustomResponse<T = any> extends Response {
	data: T;
}

const fetchApi = <T = any>(
	url: string,
	options?: RequestInit
): Promise<CustomResponse<T>> => {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(`${process.env.API_URL}${url}`, {
			headers: {
				"Content-Type": "application/json",
				...options?.headers
			},
			...options
		});

		if (!response.ok) {
			reject(new Error());
		} else {
			resolve({
				...response,
				data: await response.json()
			});
		}
	});
};

export default fetchApi;
