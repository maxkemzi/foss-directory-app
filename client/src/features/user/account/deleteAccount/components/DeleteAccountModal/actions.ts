"use server";

import {fetchDeleteAccount} from "#src/shared/api/users/accounts";
import {FormState, INITIAL_FORM_STATE} from "./constants";

const deleteAccount = async (prevState: FormState) => {
	try {
		await fetchDeleteAccount();
		return {
			...INITIAL_FORM_STATE,
			triggerStatusHandler: prevState.triggerStatusHandler,
			success: true
		};
	} catch (e) {
		return {
			...INITIAL_FORM_STATE,
			triggerStatusHandler: prevState.error
				? !prevState.triggerStatusHandler
				: prevState.triggerStatusHandler,
			error: "Error deleting account"
		};
	}
};

export {deleteAccount};
