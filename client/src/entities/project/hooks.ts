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
		(params: Pick<FetchProjectsSearchParams, "search" | "searchTags"> = {}) => {
			fetchData(variant, {...params, page: 1, limit: response.limit});
		},
		[fetchData, response.limit, variant]
	);

	const fetchMore = useCallback(
		(params: Pick<FetchProjectsSearchParams, "search" | "searchTags"> = {}) => {
			fetchData(variant, {
				...params,
				page: response.page + 1,
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
