"use client";

import {TagFromApi} from "#src/shared/apis";
import {FetchTagsSearchParams} from "#src/shared/apis/tags";
import {useSafeAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {useCallback, useState} from "react";
import {safeGetAll} from "./actions";

const LIMIT = 10;

const useTagList = () => {
	const {showToast} = useToast();
	const [tags, setTags] = useState<TagFromApi[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState<boolean>(false);

	const {execute, isPending: isFetching} = useSafeAction(safeGetAll, {
		onSuccess: result => {
			const {data: response} = result;

			if (response.page === 1) {
				setTags(response.data);
			} else {
				setTags(prev => [...prev, ...response.data]);
			}

			setPage(response.page);
			setHasMore(response.hasMore);
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	const fetchFirstPage = useCallback(
		({search}: Pick<FetchTagsSearchParams, "search"> = {}) => {
			execute({page: 1, limit: LIMIT, search});
		},
		[execute]
	);

	const fetchMore = useCallback(
		({search}: Pick<FetchTagsSearchParams, "search"> = {}) => {
			execute({
				page: page + 1,
				search,
				limit: LIMIT
			});
		},
		[execute, page]
	);

	return {tags, hasMore, isFetching, fetchFirstPage, fetchMore};
};

export {useTagList};
