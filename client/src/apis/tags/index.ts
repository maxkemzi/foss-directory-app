import {FetchTagsResponse} from "#src/types/apis/tags";
import {fetchApi} from "#src/actions/api";

const BASE_URL = "/tags";

const fetchAllTags = async (): Promise<FetchTagsResponse> => {
	const response = await fetchApi(BASE_URL);
	return response.json();
};

export {fetchAllTags};
