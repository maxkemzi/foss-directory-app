import fetchApi from "./fetchApi";

type Response = boolean;

const requestCheck = (accessToken: string) =>
	fetchApi<Response>("/auth/check", {
		method: "POST",
		headers: {Cookie: `accessToken=${accessToken}`},
		cache: "no-store"
	});

export default requestCheck;
