"use server";

import {ApiError, requestSignup} from "#src/api";
import {COOKIE_OPTIONS, Route} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const signUp = async (prevState: any, formData: FormData) => {
	const validatedFields = VALIDATION_SCHEMA.safeParse({
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword")
	});

	if (!validatedFields.success) {
		return {
			...INITIAL_FORM_STATE,
			errors: validatedFields.error.flatten().fieldErrors
		};
	}

	try {
		const {
			data: {user, tokens}
		} = await requestSignup(validatedFields.data);

		const cookieStore = cookies();
		cookieStore.set("user", JSON.stringify(user), COOKIE_OPTIONS);
		cookieStore.set("accessToken", tokens.access, COOKIE_OPTIONS);
		cookieStore.set("refreshToken", tokens.refresh, COOKIE_OPTIONS);
		cookieStore.set("isAuth", "true", COOKIE_OPTIONS);
	} catch (e) {
		console.log(e);

		return {
			...INITIAL_FORM_STATE,
			status: e instanceof ApiError ? e.message : "Something went wrong."
		};
	}

	return redirect(Route.HOME);
};

export {signUp};
