"use client";

import {useCallback, useRef, useState, useTransition} from "react";
import {Default, Options, Resolve, Return, SafeAction} from "./types";

const resolve = <T>(value?: T): Resolve<T> => {
	return (value !== undefined ? value : undefined) as Resolve<T>;
};

const useSafeAction = <
	OrigAction extends (...args: any[]) => Promise<any>,
	OutData extends Record<string, any> = Default
>(
	action: SafeAction<OrigAction, OutData>,
	opts: Options<Resolve<OutData>>
): Return<Parameters<OrigAction>> => {
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const onSuccessRef = useRef(opts.onSuccess);
	const onErrorRef = useRef(opts.onError);

	const execute = useCallback(
		(...args: Parameters<OrigAction>) => {
			return startTransition(async () => {
				setSuccess(null);
				setError(null);

				const result = await action(...args);

				if ("success" in result && !("error" in result)) {
					onSuccessRef.current?.({
						data: resolve(result.data),
						success: result.success
					});
					setSuccess(result.success);
				} else if ("error" in result && !("success" in result)) {
					onErrorRef.current?.({error: result.error});
					setError(result.error);
				}
			});
		},
		[action]
	);

	return {execute, isPending, success, error};
};

export default useSafeAction;
