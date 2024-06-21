"use client";

import {
	FetchRolesResponse,
	FetchRolesSearchParams
} from "#src/shared/apis/roles";
import {useList} from "#src/shared/hooks";
import {useCallback} from "react";
import {safeGetAll} from "./actions";

const useRoleList = (serverResponse?: FetchRolesResponse) => {
	const {fetchData, isFetching, response} = useList(safeGetAll, serverResponse);

	const fetchFirstPage = useCallback(
		({search}: Pick<FetchRolesSearchParams, "search"> = {}) => {
			fetchData({page: 1, limit: response.limit, search});
		},
		[fetchData, response.limit]
	);

	const fetchMore = useCallback(
		({search}: Pick<FetchRolesSearchParams, "search"> = {}) => {
			fetchData({page: response.page + 1, search, limit: response.limit});
		},
		[fetchData, response.limit, response.page]
	);

	return {
		roles: response.data,
		hasMore: response.hasMore,
		isFetching,
		fetchFirstPage,
		fetchMore
	};
};

export {useRoleList};
