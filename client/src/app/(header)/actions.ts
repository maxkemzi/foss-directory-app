"use server";

import {ApiError, AuthApi} from "#src/apis";
import {Pathname} from "#src/constants";
import {deleteAuthCookiesFromStore} from "#src/helpers";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const logOut = async () => {
	const cookieStore = cookies();

	const refreshToken = cookieStore.get("refreshToken")?.value;
	if (!refreshToken) {
		throw new ApiError(401, "Not authorized.");
	}

	await AuthApi.logOut(refreshToken);

	deleteAuthCookiesFromStore(cookieStore);

	redirect(Pathname.LOGIN);
};

export {logOut};
