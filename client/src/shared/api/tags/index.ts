import {FetchTagsResponse} from "./types";
import {fetchApi} from "../actions";

const BASE_URL = "/tags";

const fetchAllTags = async (): Promise<FetchTagsResponse> => {
	const response = await fetchApi(BASE_URL);
	return response.json();
};

export {fetchAllTags};
