"use server";

import {isApiError} from "#src/shared/apis/lib";
import usersApi from "#src/shared/apis/users";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const deleteAccount = async () => {
	try {
		await usersApi.deleteAccount();
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error deleting account";
		throw new AppError(message);
	}
};

const safeDeleteAccount: SafeAction<typeof deleteAccount> = async () => {
	try {
		await deleteAccount();
		return {success: "Account has been deleted"};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {safeDeleteAccount};
