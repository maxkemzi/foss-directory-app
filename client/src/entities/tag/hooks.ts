"use client";

import {FetchTagsResponse, FetchTagsSearchParams} from "#src/shared/apis/tags";
import {useList} from "#src/shared/hooks";
import {useCallback} from "react";
import {safeGetAll} from "./actions";

const useTagList = (serverResponse?: FetchTagsResponse) => {
	const {fetchData, isFetching, response} = useList(safeGetAll, serverResponse);

	const fetchFirstPage = useCallback(
		({search}: Pick<FetchTagsSearchParams, "search"> = {}) => {
			fetchData({page: 1, limit: response.limit, search});
		},
		[fetchData, response.limit]
	);

	const fetchMore = useCallback(
		({search}: Pick<FetchTagsSearchParams, "search"> = {}) => {
			fetchData({page: response.page + 1, search, limit: response.limit});
		},
		[fetchData, response.limit, response.page]
	);

	return {
		tags: response.data,
		hasMore: response.hasMore,
		isFetching,
		fetchFirstPage,
		fetchMore
	};
};

export {useTagList};
