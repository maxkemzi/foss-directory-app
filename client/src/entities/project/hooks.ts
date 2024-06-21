"use client";

import {
	FetchProjectsResponse,
	FetchProjectsSearchParams,
	FetchProjectsVariant
} from "#src/shared/apis/projects";
import {useList} from "#src/shared/hooks";
import {useCallback} from "react";
import {safeGetByVariant} from "./actions";

const useProjectList = (
	variant: FetchProjectsVariant,
	serverResponse?: FetchProjectsResponse
) => {
	const {fetchData, isFetching, response} = useList(
		safeGetByVariant,
		serverResponse
	);

	const fetchFirstPage = useCallback(
		({search}: Pick<FetchProjectsSearchParams, "search"> = {}) => {
			fetchData(variant, {page: 1, search, limit: response.limit});
		},
		[fetchData, response.limit, variant]
	);

	const fetchMore = useCallback(
		({search}: Pick<FetchProjectsSearchParams, "search"> = {}) => {
			fetchData(variant, {
				page: response.page + 1,
				search,
				limit: response.limit
			});
		},
		[fetchData, response.limit, response.page, variant]
	);

	return {
		projects: response.data,
		hasMore: response.hasMore,
		isFetching,
		fetchFirstPage,
		fetchMore
	};
};

export {useProjectList};
