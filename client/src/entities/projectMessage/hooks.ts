"use client";

import {FetchProjectMessagesResponse} from "#src/shared/apis/projects/messages";
import {useList} from "#src/shared/hooks";
import {useCallback} from "react";
import {safeGetByProjectId} from "./actions";

const useProjectMessageList = (
	projectId: string,
	serverResponse?: FetchProjectMessagesResponse
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
	}, [fetchData, projectId, response.limit, response.page]);

	return {
		messages: response.data,
		hasMore: response.hasMore,
		isFetching,
		fetchFirstPage,
		fetchMore
	};
};

export {useProjectMessageList};
