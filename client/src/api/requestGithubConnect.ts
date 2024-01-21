import fetchApi from "./fetchApi";

interface Body {
	code: string;
}

type Response = boolean;

const requestGithubConnect = (body: Body, authorization: string) =>
	fetchApi<Response>("/github/connect", {
		method: "POST",
		body: JSON.stringify(body),
		headers: {authorization},
		cache: "no-store"
	});

export default requestGithubConnect;
