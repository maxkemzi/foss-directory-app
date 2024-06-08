"use server";

import {fetchDeleteAccount} from "#src/shared/api/users";

const deleteAccount = async () => {
	await fetchDeleteAccount();
};

export {deleteAccount};
