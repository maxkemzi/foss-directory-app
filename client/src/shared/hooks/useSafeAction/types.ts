type Default = {__default: true};
type Resolve<T> = T extends Default ? undefined : T;

type SuccessReturnData<Data extends Record<string, any>> = {
	success: string;
	error?: never;
	data?: Data;
};
type ErrorReturnData = {
	error: string;
	success?: never;
	data?: never;
};

type SafeAction<
	OrigAction extends (...any: any[]) => any = (...any: any[]) => any,
	OutData extends Record<string, any> = Default
> = (
	...args: Parameters<OrigAction>
) => Promise<SuccessReturnData<OutData> | ErrorReturnData>;

type SuccessResult<Data extends Record<string, any> | undefined> = {
	success: string;
	data: Data;
};
type ErrorResult = {
	error: string;
};

interface Options<Data extends Record<string, any> | undefined> {
	onSuccess?: (result: SuccessResult<Data>) => void;
	onError?: (result: ErrorResult) => void;
}

interface Return<Args extends any[]> {
	execute: (...args: Args) => void;
	isPending: boolean;
	success: string | null;
	error: string | null;
}

export type {Default, Options, Resolve, Return, SafeAction};
