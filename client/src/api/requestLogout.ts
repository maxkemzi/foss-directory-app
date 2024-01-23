import fetchApi from "./fetchApi";

interface Response {
	message: string;
}

const requestLogout = async (refreshToken: string): Promise<Response> => {
	const response = await fetchApi("/auth/logout", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`},
		cache: "no-store"
	});
	return response.json();
};

export default requestLogout;
