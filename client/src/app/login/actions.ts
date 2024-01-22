"use server";

import {ApiError, requestLogin} from "#src/api";
import {COOKIE_OPTIONS, Route} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const logIn = async (prevState: any, formData: FormData) => {
	const validatedFields = VALIDATION_SCHEMA.safeParse({
		email: formData.get("email"),
		password: formData.get("password")
	});

	if (!validatedFields.success) {
		return {
			...INITIAL_FORM_STATE,
			errors: validatedFields.error.flatten().fieldErrors
		};
	}

	try {
		const {user, tokens} = await requestLogin(validatedFields.data);

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

export {logIn};
