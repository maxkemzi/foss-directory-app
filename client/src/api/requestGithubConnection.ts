import fetchApiWithAuth from "./fetchApiWithAuth";

type Response = string;

const requestGithubConnection = async (code: string): Promise<Response> => {
	const response = await fetchApiWithAuth(`/github/callback?code=${code}`, {
		cache: "no-store"
	});
	return response.json();
};

export default requestGithubConnection;
