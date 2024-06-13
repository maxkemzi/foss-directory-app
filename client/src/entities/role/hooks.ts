"use client";

import {RoleFromApi, calcHasMore} from "#src/shared/apis";
import {FetchTagsSearchParams} from "#src/shared/apis/tags";
import {useSafeAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {useCallback, useRef, useState} from "react";
import {safeGetAll} from "./actions";

const useRoleList = () => {
	const {showToast} = useToast();
	const [roles, setRoles] = useState<RoleFromApi[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState<boolean>(false);
	const limit = useRef(10);

	const {execute, isPending: isFetching} = useSafeAction(safeGetAll, {
		onSuccess: result => {
			const {data: response} = result;

			if (response.page === 1) {
				setRoles(response.data);
			} else {
				setRoles(prev => [...prev, ...response.data]);
			}

			setPage(response.page);
			setHasMore(calcHasMore(response.page, response.totalPages));
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	const fetchFirstPage = useCallback(
		({search}: Pick<FetchTagsSearchParams, "search"> = {}) => {
			execute({page: 1, limit: limit.current, search});
		},
		[execute]
	);

	const fetchMore = useCallback(
		({search}: Pick<FetchTagsSearchParams, "search"> = {}) => {
			execute({
				page: page + 1,
				search,
				limit: limit.current
			});
		},
		[execute, page]
	);

	return {roles, hasMore, isFetching, fetchFirstPage, fetchMore};
};

export {useRoleList};
