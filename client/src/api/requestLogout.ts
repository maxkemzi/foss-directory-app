import fetchApi from "./fetchApi";

interface Response {
	message: string;
}

const requestLogout = (refreshToken: string) =>
	fetchApi<Response>("/auth/logout", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`}
	});

export default requestLogout;
