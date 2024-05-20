import {fetchApiWithAuth} from "#src/actions/auth";
import {
	FetchReposResponse,
	FetchUrlResponse
} from "#src/types/apis/integrations/github";

const BASE_URL = "/integrations/github";

const fetchGithubConnectionUrl = async (): Promise<FetchUrlResponse> => {
	const response = await fetchApiWithAuth(BASE_URL);
	return response.json();
};

const fetchMyGithubRepos = async (): Promise<FetchReposResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/repos`);
	return response.json();
};

export {fetchGithubConnectionUrl, fetchMyGithubRepos};
