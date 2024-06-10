type SuccessData<T = {}> = T & {
	success: string;
	error?: never;
};
type ErrorData<T = {}> = T & {
	error: string;
	success?: never;
};

type ExtractSuccessData<T> = T extends SuccessData ? T : never;
type ExtractErrorData<T> = T extends ErrorData ? T : never;

type Action<Data> = (
	...args: any[]
) => Promise<
	SuccessData<ExtractSuccessData<Data>> | ErrorData<ExtractErrorData<Data>>
>;

interface Options<Data> {
	onSuccess?: (data: ExtractSuccessData<Data>) => void;
	onError?: (data: ExtractErrorData<Data>) => void;
}

interface Return<Args extends Parameters<any>> {
	execute: (...args: Args) => void;
	isPending: boolean;
	success: string | null;
	error: string | null;
}

export type {Action, Options, Return};
