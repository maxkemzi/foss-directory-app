"use server";

import {fetchApiWithAuth} from "#src/shared/auth";
import {ApiHeader} from "../../constants";
import {parseNumericHeader} from "../../helpers";
import {FetchProjectMessagesResponse} from "./types";

const BASE_URL = "/projects";

const fetchByProjectId = async (
	id: string,
	options: RequestInit = {}
): Promise<FetchProjectMessagesResponse> => {
	const response = await fetchApiWithAuth(
		`${BASE_URL}/${id}/messages`,
		options
	);

	const data = await response.json();

	const {headers} = response;
	const totalCount = headers.get(ApiHeader.TOTAL_COUNT);
	const page = headers.get(ApiHeader.PAGE);
	const totalPages = headers.get(ApiHeader.TOTAL_PAGES);

	return {
		data,
		totalCount: parseNumericHeader(totalCount),
		page: parseNumericHeader(page),
		totalPages: parseNumericHeader(totalPages)
	};
};

export {fetchByProjectId};
