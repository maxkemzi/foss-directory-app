"use client";

import {TagFromApi} from "#src/shared/apis";
import {FetchTagsSearchParams} from "#src/shared/apis/tags";
import {useAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {useCallback, useRef, useState} from "react";
import {getAllSafe} from "./actions";

const useTagList = () => {
	const {showToast} = useToast();
	const [tags, setTags] = useState<TagFromApi[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState<boolean>(false);
	const limit = useRef(10).current;

	const {execute, isPending: isFetching} = useAction(getAllSafe, {
		onSuccess: data => {
			const {response} = data;

			if (response.page === 1) {
				setTags(response.data);
			} else {
				setTags(prev => [...prev, ...response.data]);
			}

			if (response.page) {
				setPage(response.page);

				if (response.totalPages) {
					setHasMore(response.page < response.totalPages);
				}
			}
		},
		onError: data => {
			showToast({variant: "error", message: data.error});
		}
	});

	const fetchFirstPage = useCallback(
		({search}: Pick<FetchTagsSearchParams, "search"> = {}) => {
			execute({page: 1, limit, search});
		},
		[execute, limit]
	);

	const fetchMore = useCallback(
		({search}: Pick<FetchTagsSearchParams, "search"> = {}) => {
			execute({
				page: page + 1,
				search,
				limit
			});
		},
		[execute, limit, page]
	);

	return {tags, hasMore, isFetching, fetchFirstPage, fetchMore};
};

export {useTagList};
