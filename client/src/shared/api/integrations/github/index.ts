import {fetchApiWithAuth} from "#src/shared/auth";
import {FetchReposResponse, FetchUrlResponse} from "./types";

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
