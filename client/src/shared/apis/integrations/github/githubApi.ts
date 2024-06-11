"use server";

import {fetchApiWithAuth} from "../../../auth";
import {FetchReposResponse, FetchConnectionUrlResponse} from "./types";

const BASE_URL = "/integrations/github";

const fetchConnectionUrl = async (): Promise<FetchConnectionUrlResponse> => {
	const response = await fetchApiWithAuth(BASE_URL);

	const data = await response.json();
	return {data};
};

const fetchRepos = async (): Promise<FetchReposResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/repos`);

	const data = await response.json();
	return {data};
};

export {fetchConnectionUrl, fetchRepos};
