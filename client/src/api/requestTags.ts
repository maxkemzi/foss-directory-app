import fetchApi from "./fetchApi";
import {Tag} from "./types";

type Response = Tag[];

const requestTags = async (): Promise<Response> => {
	const response = await fetchApi("/projects/tags");
	return response.json();
};

export default requestTags;
