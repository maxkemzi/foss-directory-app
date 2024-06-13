"use client";

import {ProjectFromApi, calcHasMore} from "#src/shared/apis";
import {FetchProjectsSearchParams} from "#src/shared/apis/projects";
import {useSafeAction} from "#src/shared/hooks";
import {useCallback, useRef, useState} from "react";
import {safeGetAll, safeGetByMembership, safeGetByOwnership} from "./actions";
import {ProjectsFetchVariant} from "./types";

interface Options {
	initialProjects: ProjectFromApi[];
	variant: ProjectsFetchVariant;
	initialHasMore: boolean;
	initialParams?: Omit<FetchProjectsSearchParams, "search">;
}

const VARIANT_TO_ACTION_MAPPING = {
	all: safeGetAll,
	ownership: safeGetByOwnership,
	membership: safeGetByMembership
};

const useProjectList = (opts: Options) => {
	const {initialProjects, variant, initialHasMore, initialParams = {}} = opts;
	const [projects, setProjects] = useState(initialProjects);
	const [page, setPage] = useState(initialParams.page || 1);
	const [hasMore, setHasMore] = useState<boolean>(initialHasMore || false);
	const limit = useRef(initialParams.limit || 6);

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
				setHasMore(calcHasMore(response.page, response.totalPages));
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
