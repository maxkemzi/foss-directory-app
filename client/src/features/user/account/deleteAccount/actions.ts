"use server";

import {isApiError} from "#src/shared/api/lib";
import {fetchDeleteAccount} from "#src/shared/api/users";

const deleteAccount = async () => {
	try {
		await fetchDeleteAccount();
		return {success: "Account has been deleted"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error deleting account";
		return {error};
	}
};

export {deleteAccount};
