"use server";

import {signUp} from "#src/apis/auth";
import {isApiError} from "#src/lib";
import {INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const signUpAction = async (prevState: any, formData: FormData) => {
	const validatedFields = VALIDATION_SCHEMA.safeParse({
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword")
	});

	if (!validatedFields.success) {
		return {
			...INITIAL_FORM_STATE,
			fieldErrors: validatedFields.error.flatten().fieldErrors
		};
	}

	try {
		await signUp(validatedFields.data);

		return {...INITIAL_FORM_STATE, success: true};
	} catch (e) {
		console.log(e);

		return {
			...INITIAL_FORM_STATE,
			error: isApiError(e) ? e.message : "Something went wrong."
		};
	}
};

export {signUpAction};
