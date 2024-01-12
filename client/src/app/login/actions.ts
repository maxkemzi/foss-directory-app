"use server";

import {requestLogin} from "#src/api";
import {Route} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const logIn = async (formData: FormData) => {
	try {
		const cookieStore = cookies();

		const {
			data: {user, tokens}
		} = await requestLogin({
			email: formData.get("email") as string,
			password: formData.get("password") as string
		});

		const cookieOptions = {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000};
		cookieStore.set("user", JSON.stringify(user), cookieOptions);
		cookieStore.set("accessToken", tokens.access, cookieOptions);
		cookieStore.set("refreshToken", tokens.refresh, cookieOptions);
	} catch (e) {
		console.log(e);
	} finally {
		redirect(Route.HOME);
	}
};

export {logIn};
