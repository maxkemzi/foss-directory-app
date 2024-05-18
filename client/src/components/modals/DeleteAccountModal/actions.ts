"use server";

import {logOut} from "#src/actions/auth";
import {fetchDeleteAccount} from "#src/apis/users/accounts";

const deleteAccount = async () => {
	await fetchDeleteAccount();
	return logOut();
};

export {deleteAccount};
