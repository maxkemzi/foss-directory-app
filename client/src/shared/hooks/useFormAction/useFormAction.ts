"use client";

import {useCallback, useState, useTransition} from "react";
import {convertFormDataToObject} from "./helpers";
import {
	Action,
	BaseOptions,
	FieldErrors,
	Options,
	OptionsWithValidationSchema,
	ReturnType
} from "./types";

function useFormAction<Fields, Response = unknown>(
	action: Action<Partial<Fields>, Response>,
	opts: BaseOptions<Fields, Response>
): ReturnType<Fields>;

function useFormAction<Fields, Response = unknown>(
	action: Action<Fields, Response>,
	opts: OptionsWithValidationSchema<Fields, Response>
): ReturnType<Fields>;

function useFormAction<Fields, Response = unknown>(
	action: any,
	opts: Options<Fields, Response>
) {
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const [fieldErrors, setFieldErrors] = useState<FieldErrors<Fields>>({});

	const formAction = useCallback(
		(formData: FormData) => {
			startTransition(async () => {
				setFieldErrors({});
				setError(null);

				let data = convertFormDataToObject<Fields>(formData);

				if (opts.validationSchema) {
					const validatedFields = opts.validationSchema.safeParse(data);

					if (!validatedFields.success) {
						const errors = validatedFields.error.flatten().fieldErrors;
						setFieldErrors(errors);
						opts.onValidationError?.(errors);
						return;
					}

					data = validatedFields.data;
				}

				try {
					const response = await action(data);
					opts.onSuccess?.(response);
				} catch (e) {
					const errorMessage =
						e instanceof Error ? e.message : "Something went wrong";

					setError(errorMessage);
					opts.onError?.(errorMessage);
				}
			});
		},
		[action, opts]
	);

	return {formAction, isPending, error, fieldErrors};
}

export default useFormAction;
