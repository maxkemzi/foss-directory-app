"use server";

import {ApiError, requestLogout} from "#src/api";
import {Route} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const logOut = async () => {
	const cookieStore = cookies();

	const refreshToken = cookieStore.get("refreshToken")?.value;
	if (!refreshToken) {
		throw new ApiError(401, "Not authorized.");
	}

	await requestLogout(refreshToken);

	cookieStore.delete("user");
	cookieStore.delete("accessToken");
	cookieStore.delete("refreshToken");
	cookieStore.delete("isAuth");

	redirect(Route.LOGIN);
};

export {logOut};
