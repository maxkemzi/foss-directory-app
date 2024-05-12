"use server";

import {signOut} from "#src/actions/auth";
import {deleteMyUserAccount} from "#src/apis/users/accounts";

const deleteAccount = async () => {
	await deleteMyUserAccount();
	return signOut();
};

export {deleteAccount};
