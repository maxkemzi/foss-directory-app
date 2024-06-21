"use client";

import {FetchProjectRequestsResponse} from "#src/shared/apis/projects/requests";
import {useList} from "#src/shared/hooks";
import {useCallback} from "react";
import {safeGetIncoming} from "./actions";

const useProjectRequestList = (
	serverResponse?: FetchProjectRequestsResponse
) => {
	const {fetchData, isFetching, response} = useList(
		safeGetIncoming,
		serverResponse
	);

	const fetchFirstPage = useCallback(() => {
		fetchData({page: 1, limit: response.limit});
	}, [fetchData, response.limit]);

	const fetchMore = useCallback(() => {
		fetchData({page: response.page + 1, limit: response.limit});
	}, [fetchData, response.limit, response.page]);

	return {
		requests: response.data,
		hasMore: response.hasMore,
		isFetching,
		fetchFirstPage,
		fetchMore
	};
};

export {useProjectRequestList};
