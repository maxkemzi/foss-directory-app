"use server";

import {ApiError, requestLogin} from "#src/api";
import {COOKIE_OPTIONS, Route} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const logIn = async (prevState: any, formData: FormData) => {
	try {
		const cookieStore = cookies();

		const {
			data: {user, tokens}
		} = await requestLogin({
			email: formData.get("email") as string,
			password: formData.get("password") as string
		});

		cookieStore.set("user", JSON.stringify(user), COOKIE_OPTIONS);
		cookieStore.set("accessToken", tokens.access, COOKIE_OPTIONS);
		cookieStore.set("refreshToken", tokens.refresh, COOKIE_OPTIONS);
		cookieStore.set("isAuth", "true", COOKIE_OPTIONS);
	} catch (e) {
		console.log(e);

		if (e instanceof ApiError) {
			return {...prevState, error: e.message};
		}

		return {...prevState, error: "Something went wrong."};
	}

	return redirect(Route.HOME);
};

export {logIn};
