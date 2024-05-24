"use server";

import {logIn} from "#src/shared/auth";
import {INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const logInWithState = async (prevState: any, formData: FormData) => {
	const validatedFields = VALIDATION_SCHEMA.safeParse({
		email: formData.get("email"),
		password: formData.get("password")
	});

	if (!validatedFields.success) {
		return {
			...INITIAL_FORM_STATE,
			fieldErrors: validatedFields.error.flatten().fieldErrors
		};
	}

	try {
		await logIn(validatedFields.data);

		return {...INITIAL_FORM_STATE, success: true};
	} catch (e) {
		console.error(e);
		return {
			...INITIAL_FORM_STATE,
			error: "Error logging in."
		};
	}
};

export {logInWithState};
