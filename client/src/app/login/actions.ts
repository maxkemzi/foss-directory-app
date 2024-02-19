"use server";

import {ApiError, AuthApi} from "#src/api";
import {COOKIE_OPTIONS} from "#src/constants";
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
		cookieStore.set("user", JSON.stringify(user), COOKIE_OPTIONS);
		cookieStore.set("accessToken", tokens.access, COOKIE_OPTIONS);
		cookieStore.set("refreshToken", tokens.refresh, COOKIE_OPTIONS);
		cookieStore.set("isAuth", "true", COOKIE_OPTIONS);

		return {...INITIAL_FORM_STATE, success: true};
	} catch (e) {
		console.log(e);

		return {
			...INITIAL_FORM_STATE,
			error: e instanceof ApiError ? e.message : "Something went wrong."
		};
	}
};

export {logIn};
