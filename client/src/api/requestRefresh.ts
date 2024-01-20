import fetchApi from "./fetchApi";
import {User} from "./types";

interface Response {
	tokens: {access: string; refresh: string};
	user: User;
}

const requestRefresh = (refreshToken: string) =>
	fetchApi<Response>("/auth/refresh", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`}
	});

export default requestRefresh;
