"use client";

import {FetchProjectUsersResponse} from "#src/shared/apis/projects/users";
import {useList} from "#src/shared/hooks";
import {useCallback} from "react";
import {safeGetByProjectId} from "./actions";

const useProjectUserList = (
	projectId: string,
	serverResponse?: FetchProjectUsersResponse
) => {
	const {fetchData, isFetching, response} = useList(
		safeGetByProjectId,
		serverResponse
	);

	const fetchFirstPage = useCallback(() => {
		fetchData(projectId, {page: 1, limit: response.limit});
	}, [fetchData, projectId, response.limit]);

	const fetchMore = useCallback(() => {
		fetchData(projectId, {page: response.page + 1, limit: response.limit});
	}, [fetchData, projectId, response.page, response.limit]);

	return {
		users: response.data,
		hasMore: response.hasMore,
		isFetching,
		fetchFirstPage,
		fetchMore
	};
};

export {useProjectUserList};
