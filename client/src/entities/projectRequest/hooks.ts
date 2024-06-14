"use client";

import {FetchProjectRequestsResponse} from "#src/shared/apis/projects/requests";
import {useSafeAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {useCallback, useEffect, useRef, useState} from "react";
import {safeGetIncoming} from "./actions";

const useProjectRequestList = (
	initialResponse: FetchProjectRequestsResponse
) => {
	const {showToast} = useToast();
	const [requests, setRequests] = useState(initialResponse.data);
	const [page, setPage] = useState(initialResponse.page);
	const [hasMore, setHasMore] = useState<boolean>(initialResponse.hasMore);
	const limit = useRef(initialResponse.limit);

	useEffect(() => {
		setRequests(initialResponse.data);
	}, [initialResponse.data]);

	useEffect(() => {
		setHasMore(initialResponse.hasMore);
	}, [initialResponse.hasMore]);

	const {execute, isPending: isFetching} = useSafeAction(safeGetIncoming, {
		onSuccess: result => {
			const {data: response} = result;

			if (response.page === 1) {
				setRequests(response.data);
			} else {
				setRequests(prev => [...prev, ...response.data]);
			}

			setPage(response.page);
			setHasMore(initialResponse.hasMore);
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	const fetchMore = useCallback(() => {
		execute({
			page: page + 1,
			limit: limit.current
		});
	}, [execute, page]);

	return {requests, hasMore, isFetching, fetchMore};
};

export {useProjectRequestList};
