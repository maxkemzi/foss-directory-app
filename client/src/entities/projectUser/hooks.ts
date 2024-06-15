"use client";

import {ProjectUserFromApi} from "#src/shared/apis";
import {FetchProjectUsersResponse} from "#src/shared/apis/projects/users";
import {useSafeAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {useCallback, useRef, useState} from "react";
import {safeGetByProjectId} from "./actions";

const useProjectUserList = (
	projectId: string,
	initialResponse?: FetchProjectUsersResponse
) => {
	const initialUsers = initialResponse?.data || [];
	const initialPage = initialResponse?.page || 1;
	const initialHasMore = initialResponse?.hasMore || false;
	const initialLimit = initialResponse?.limit || 10;

	const {showToast} = useToast();
	const [users, setUsers] = useState<ProjectUserFromApi[]>(initialUsers);
	const [page, setPage] = useState(initialPage);
	const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
	const limit = useRef(initialLimit);

	const {execute, isPending: isFetching} = useSafeAction(safeGetByProjectId, {
		onSuccess: result => {
			const {data: response} = result;

			if (response.page === 1) {
				setUsers(response.data);
			} else {
				setUsers(prev => [...prev, ...response.data]);
			}

			setPage(response.page);
			setHasMore(response.hasMore);
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	const fetchFirstPage = useCallback(() => {
		execute(projectId, {page: 1, limit: limit.current});
	}, [projectId, execute]);

	const fetchMore = useCallback(() => {
		execute(projectId, {
			page: page + 1,
			limit: limit.current
		});
	}, [execute, projectId, page]);

	return {users, hasMore, isFetching, fetchFirstPage, fetchMore};
};

export {useProjectUserList};
