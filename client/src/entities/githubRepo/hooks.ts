"use client";

import {RepoFromApi} from "#src/shared/apis";
import {FetchReposSearchParams} from "#src/shared/apis/integrations/github";
import {useSafeAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {useCallback, useState} from "react";
import {safeGetByOwnership} from "./actions";

const LIMIT = 10;

const useGithubRepoList = () => {
	const {showToast} = useToast();
	const [repos, setRepos] = useState<RepoFromApi[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState<boolean>(false);

	const {execute, isPending: isFetching} = useSafeAction(safeGetByOwnership, {
		onSuccess: result => {
			const {data: response} = result;

			if (response.page === 1) {
				setRepos(response.data);
			} else {
				setRepos(prev => [...prev, ...response.data]);
			}

			setPage(response.page);
			setHasMore(response.hasMore);
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	const fetchFirstPage = useCallback(
		({search}: Pick<FetchReposSearchParams, "search"> = {}) => {
			execute({page: 1, limit: LIMIT, search});
		},
		[execute]
	);

	const fetchMore = useCallback(
		({search}: Pick<FetchReposSearchParams, "search"> = {}) => {
			execute({page: page + 1, search, limit: LIMIT});
		},
		[execute, page]
	);

	return {repos, hasMore, isFetching, fetchFirstPage, fetchMore};
};

export {useGithubRepoList};
