import fetchApi from "./fetchApi";
import {User} from "./types";

interface Response {
	tokens: {access: string; refresh: string};
	user: User;
}

const requestRefresh = async (refreshToken: string): Promise<Response> => {
	const response = await fetchApi("/auth/refresh", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`},
		cache: "no-store"
	});
	return response.json();
};

export default requestRefresh;
