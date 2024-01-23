import fetchApi from "./fetchApi";

type Response = boolean;

const requestCheck = async (accessToken: string): Promise<Response> => {
	const response = await fetchApi("/auth/check", {
		method: "POST",
		headers: {Cookie: `accessToken=${accessToken}`},
		cache: "no-store"
	});
	return response.json();
};

export default requestCheck;
