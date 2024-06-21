"use client";

import {
	FetchReposResponse,
	FetchReposSearchParams
} from "#src/shared/apis/integrations/github";
import {useList} from "#src/shared/hooks";
import {useCallback} from "react";
import {safeGetByOwnership} from "./actions";

const useGithubRepoList = (serverResponse?: FetchReposResponse) => {
	const {fetchData, isFetching, response} = useList(
		safeGetByOwnership,
		serverResponse
	);

	const fetchFirstPage = useCallback(
		({search}: Pick<FetchReposSearchParams, "search"> = {}) => {
			fetchData({page: 1, limit: response.limit, search});
		},
		[fetchData, response.limit]
	);

	const fetchMore = useCallback(
		({search}: Pick<FetchReposSearchParams, "search"> = {}) => {
			fetchData({page: response.page + 1, search, limit: response.limit});
		},
		[fetchData, response.limit, response.page]
	);

	return {
		repos: response.data,
		hasMore: response.hasMore,
		isFetching,
		fetchFirstPage,
		fetchMore
	};
};

export {useGithubRepoList};
