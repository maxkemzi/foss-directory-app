import fetchApi from "./fetchApi";

type Response = boolean;

const requestCheck = (accessToken: string) => {
	return fetchApi<Response>("/auth/check", {
		method: "POST",
		headers: {Cookie: `accessToken=${accessToken}`}
	});
};

export default requestCheck;
