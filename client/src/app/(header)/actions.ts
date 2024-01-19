"use server";

import {requestLogout} from "#src/api";
import {Route} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const logOut = async () => {
	try {
		const cookieStore = cookies();

		const refreshToken = cookieStore.get("refreshToken")?.value;
		if (!refreshToken) {
			return;
		}

		await requestLogout(refreshToken);

		cookieStore.delete("user");
		cookieStore.delete("accessToken");
		cookieStore.delete("refreshToken");
		cookieStore.delete("isAuth");
	} catch (e) {
		console.log(e);
		return;
	}

	redirect(Route.LOGIN);
};

export {logOut};
