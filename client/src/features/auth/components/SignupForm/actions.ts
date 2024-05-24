"use server";

import {fetchSignUp} from "#src/shared/api/auth";
import {INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const signUpWithState = async (prevState: any, formData: FormData) => {
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
		await fetchSignUp(validatedFields.data);

		return {...INITIAL_FORM_STATE, success: true};
	} catch (e) {
		console.error(e);
		return {
			...INITIAL_FORM_STATE,
			error: "Error signing up."
		};
	}
};

export {signUpWithState};
