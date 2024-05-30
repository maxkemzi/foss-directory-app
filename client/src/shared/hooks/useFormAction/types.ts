import {ZodSchema} from "zod";

type Action<Data, Response> = (data: Data) => Promise<Response>;

type BaseOptions<Fields, Response> = {
	onSuccess?: (data: Response) => void;
	onError?: (error: string) => void;
	onValidationError?: (fieldErrors: FieldErrors<Fields>) => void;
};

type OptionsWithoutValidationSchema<Fields, Response> = BaseOptions<
	Fields,
	Response
> & {
	validationSchema?: never;
};

type OptionsWithValidationSchema<Fields, Response> = BaseOptions<
	Fields,
	Response
> & {
	validationSchema: ZodSchema<Fields>;
};

type Options<Fields, Response> =
	| OptionsWithoutValidationSchema<Fields, Response>
	| OptionsWithValidationSchema<Fields, Response>;

type AllKeys<Fields> = Fields extends any ? keyof Fields : never;
type FieldErrors<Fields> = {[key in AllKeys<Fields>]?: string[] | undefined};

interface ReturnType<Fields> {
	formAction: (formData: FormData) => void;
	isPending: boolean;
	error: string | null;
	fieldErrors: FieldErrors<Fields>;
}

export type {
	Action,
	BaseOptions,
	OptionsWithValidationSchema,
	Options,
	FieldErrors,
	ReturnType
};
