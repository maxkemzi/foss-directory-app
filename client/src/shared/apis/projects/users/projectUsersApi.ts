"use server";

import {fetchApiWithAuth} from "#src/shared/auth";
import {getPaginationHeaderValues} from "../../helpers";
import {FetchProjectUsersResponse} from "./types";

const BASE_URL = "/projects";

const fetchByProjectId = async (
	id: string
): Promise<FetchProjectUsersResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/users`);

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
