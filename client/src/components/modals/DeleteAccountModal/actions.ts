"use server";

import {AccountsApi} from "#src/api";
import {Route} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const deleteAccount = async () => {
	await AccountsApi.delete();

	const cookieStore = cookies();
	cookieStore.delete("user");
	cookieStore.delete("accessToken");
	cookieStore.delete("refreshToken");
	cookieStore.delete("isAuth");

	redirect(Route.SIGNUP);
};

export {deleteAccount};
