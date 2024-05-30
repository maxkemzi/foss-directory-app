"use server";

import {fetchDeleteAccount} from "#src/shared/api/users/accounts";

const deleteAccount = async () => {
	await fetchDeleteAccount();
};

export {deleteAccount};
