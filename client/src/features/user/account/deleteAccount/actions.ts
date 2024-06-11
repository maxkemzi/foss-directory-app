"use server";

import {isApiError} from "#src/shared/apis/lib";
import usersApi from "#src/shared/apis/users";

const deleteAccount = async () => {
	try {
		await usersApi.deleteAccount();
		return {success: "Account has been deleted"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error deleting account";
		return {error};
	}
};

export {deleteAccount};
