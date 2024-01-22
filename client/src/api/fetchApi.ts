const fetchApi = async (url: string, options: RequestInit = {}) =>
	fetch(`${process.env.API_URL}${url}`, options);

export default fetchApi;
