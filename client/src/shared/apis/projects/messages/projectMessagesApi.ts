"use server";

import {fetchApiWithAuth} from "#src/shared/auth";
import {getPaginationHeaderValues} from "../../helpers";
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
	const {totalCount, page, totalPages} = getPaginationHeaderValues(headers);

	return {
		data,
		totalCount,
		page,
		totalPages
	};
};

export {fetchByProjectId};
