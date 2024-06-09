"use server";

import {fetchProjectUsersByProjectId} from "#src/shared/api/projects/users";

const getProjectUsersByProjectId = async (id: string) => {
	try {
		const users = await fetchProjectUsersByProjectId(id);
		return users;
	} catch (e) {
		console.error(e);
		throw new Error("Error fetching users");
	}
};

export {getProjectUsersByProjectId};
