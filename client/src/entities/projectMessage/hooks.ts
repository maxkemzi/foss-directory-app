"use client";

import {FetchProjectMessagesResponse} from "#src/shared/apis/projects/messages";
import {useSafeAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {useCallback, useEffect, useRef, useState} from "react";
import {safeGetByProjectId} from "./actions";

const useProjectMessageList = (
	projectId: string,
	initialResponse: FetchProjectMessagesResponse
) => {
	const {showToast} = useToast();
	const [messages, setMessages] = useState(initialResponse.data);
	const [page, setPage] = useState(initialResponse.page);
	const [hasMore, setHasMore] = useState<boolean>(initialResponse.hasMore);
	const limit = useRef(initialResponse.limit);

	useEffect(() => {
		setMessages(initialResponse.data);
	}, [initialResponse.data]);

	useEffect(() => {
		setHasMore(initialResponse.hasMore);
	}, [initialResponse.hasMore]);

	const {execute, isPending: isFetching} = useSafeAction(safeGetByProjectId, {
		onSuccess: result => {
			const {data: response} = result;

			if (response.page === 1) {
				setMessages(response.data);
			} else {
				setMessages(prev => [...prev, ...response.data]);
			}

			setPage(response.page);
			setHasMore(response.hasMore);
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	const fetchMore = useCallback(() => {
		execute(projectId, {page: page + 1, limit: limit.current});
	}, [execute, page, projectId]);

	return {messages, hasMore, isFetching, fetchMore};
};

export {useProjectMessageList};
