"use server";

import {AccountsApi} from "#src/api";
import {Pathname} from "#src/constants";
import {deleteAuthCookiesFromStore} from "#src/helpers";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const deleteAccount = async () => {
	await AccountsApi.delete();

	const cookieStore = cookies();
	deleteAuthCookiesFromStore(cookieStore);

	redirect(Pathname.SIGNUP);
};

export {deleteAccount};
