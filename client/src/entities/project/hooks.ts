"use client";

import {
	FetchProjectsResponse,
	FetchProjectsSearchParams
} from "#src/shared/apis/projects";
import {useSafeAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {useCallback, useEffect, useRef, useState} from "react";
import {safeGetAll, safeGetByMembership, safeGetByOwnership} from "./actions";
import {ProjectsFetchVariant} from "./types";

const VARIANT_TO_ACTION_MAPPING = {
	all: safeGetAll,
	ownership: safeGetByOwnership,
	membership: safeGetByMembership
};

const useProjectList = (
	variant: ProjectsFetchVariant,
	initialResponse: FetchProjectsResponse
) => {
	const {showToast} = useToast();
	const [projects, setProjects] = useState(initialResponse.data);
	const [page, setPage] = useState(initialResponse.page);
	const [hasMore, setHasMore] = useState<boolean>(initialResponse.hasMore);
	const limit = useRef(initialResponse.limit);

	useEffect(() => {
		setProjects(initialResponse.data);
	}, [initialResponse.data]);

	useEffect(() => {
		setHasMore(initialResponse.hasMore);
	}, [initialResponse.hasMore]);

	const {execute, isPending: isFetching} = useSafeAction(
		VARIANT_TO_ACTION_MAPPING[variant],
		{
			onSuccess: result => {
				const {data: response} = result;

				if (response.page === 1) {
					setProjects(response.data);
				} else {
					setProjects(prev => [...prev, ...response.data]);
				}

				setPage(response.page);
				setHasMore(response.hasMore);
			},
			onError: result => {
				showToast({variant: "error", message: result.error});
			}
		}
	);

	const fetchMore = useCallback(
		({search}: Pick<FetchProjectsSearchParams, "search"> = {}) => {
			execute({
				page: page + 1,
				search,
				limit: limit.current
			});
		},
		[execute, page]
	);

	return {projects, hasMore, isFetching, fetchMore};
};

export {useProjectList};
