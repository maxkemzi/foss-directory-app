"use server";

import {AuthApi, isApiError} from "#src/apis";
import {COOKIE_OPTIONS, Cookie} from "#src/constants";
import {cookies} from "next/headers";
import {INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const logIn = async (prevState: any, formData: FormData) => {
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
		const {user, tokens} = await AuthApi.logIn(validatedFields.data);

		const cookieStore = cookies();
		cookieStore.set(Cookie.USER, JSON.stringify(user), {
			...COOKIE_OPTIONS,
			httpOnly: false
		});
		cookieStore.set(Cookie.ACCESS_TOKEN, tokens.access, COOKIE_OPTIONS);
		cookieStore.set(Cookie.REFRESH_TOKEN, tokens.refresh, COOKIE_OPTIONS);

		return {...INITIAL_FORM_STATE, success: true};
	} catch (e) {
		console.log(e);

		return {
			...INITIAL_FORM_STATE,
			error: isApiError(e) ? e.message : "Something went wrong."
		};
	}
};

export {logIn};
