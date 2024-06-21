import {ApiResponseWithPagination} from "#src/shared/apis";
import {useToast} from "#src/shared/toast";
import {useEffect, useState} from "react";
import {SafeAction} from "./useSafeAction/types";
import useSafeAction from "./useSafeAction/useSafeAction";

interface Response<T extends any[]> {
	data: T;
	page: number;
	hasMore: boolean;
	limit: number;
}

interface Return<ActionArgs extends any[], ActionData extends any[]> {
	fetchData: (...args: ActionArgs) => any;
	response: Response<ActionData>;
	isFetching: boolean;
}

const useList = <
	ActionArgs extends any[],
	ActionResponse extends ApiResponseWithPagination<any[]>
>(
	action: SafeAction<(...args: ActionArgs) => any, ActionResponse>,
	serverResponse?: ActionResponse
): Return<ActionArgs, ActionResponse["data"]> => {
	const {showToast} = useToast();
	const [response, setResponse] = useState<Response<ActionResponse["data"]>>({
		data: serverResponse?.data || [],
		page: serverResponse?.page || 1,
		hasMore: serverResponse?.hasMore || false,
		limit: serverResponse?.limit || 10
	});

	useEffect(() => {
		if (!serverResponse) {
			return;
		}

		setResponse(prev => ({...prev, ...serverResponse}));
	}, [serverResponse]);

	const {execute: fetchData, isPending: isFetching} = useSafeAction(action, {
		onSuccess: result => {
			const {data: newResponse} = result;

			if (newResponse.page === 1) {
				setResponse(prev => ({...prev, data: newResponse.data}));
			} else {
				setResponse(prev => ({
					...prev,
					data: [...prev.data, ...newResponse.data]
				}));
			}

			setResponse(prev => ({
				...prev,
				page: newResponse.page,
				hasMore: newResponse.hasMore
			}));
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	return {fetchData, response, isFetching};
};

export default useList;
