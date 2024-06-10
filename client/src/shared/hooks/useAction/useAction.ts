"use client";

import {useCallback, useRef, useState, useTransition} from "react";
import {Action, Options, Return} from "./types";

const useAction = <A extends Action<Awaited<ReturnType<A>>>>(
	action: A,
	opts: Options<Awaited<ReturnType<A>>>
): Return<Parameters<A>> => {
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const onSuccessRef = useRef(opts.onSuccess);
	const onErrorRef = useRef(opts.onError);

	const execute = useCallback(
		(...args: Parameters<A>) => {
			return startTransition(async () => {
				setError(null);

				const response = await action(...args);

				if (response.success) {
					onSuccessRef.current?.(response);
					setSuccess(response.success);
				} else if (response.error) {
					onErrorRef.current?.(response);
					setError(response.error);
				}
			});
		},
		[action]
	);

	return {execute, isPending, success, error};
};

export default useAction;
