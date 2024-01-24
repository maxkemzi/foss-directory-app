"use server";

import {requestAccountDeletion} from "#src/api";
import {Route} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const deleteAccount = async () => {
	await requestAccountDeletion();

	const cookieStore = cookies();
	cookieStore.delete("user");
	cookieStore.delete("accessToken");
	cookieStore.delete("refreshToken");
	cookieStore.delete("isAuth");

	redirect(Route.SIGNUP);
};

export {deleteAccount};
