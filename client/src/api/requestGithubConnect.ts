import fetchApi from "./fetchApi";

interface Body {
	code: string;
}

type Response = boolean;

const requestGithubConnect = (body: Body, authorization: string) => {
	return fetchApi<Response>("/github/connect", {
		method: "POST",
		body: JSON.stringify(body),
		headers: {authorization}
	});
};

export default requestGithubConnect;
