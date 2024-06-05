"use server";

import {fetchProjectUsersByProjectId} from "#src/shared/api/projects/users";

const getProjectUsersByProjectId = async (id: string) => {
	try {
		const projectUsers = await fetchProjectUsersByProjectId(id);
		return projectUsers;
	} catch (e) {
		console.error(e);
		throw new Error("Error fetching project users");
	}
};

export {getProjectUsersByProjectId};
