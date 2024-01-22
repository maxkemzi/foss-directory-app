import fetchApiWithAuth from "./fetchApiWithAuth";

type Response = string;

const requestGithubConnect = async (): Promise<Response> => {
	const response = await fetchApiWithAuth("/github", {
		cache: "no-store"
	});
	return response.url;
};

export default requestGithubConnect;
