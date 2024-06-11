"use server";

import projectUsersApi from "#src/shared/apis/projects/users";

const getProjectUsersByProjectId = async (id: string) => {
	try {
		const response = await projectUsersApi.fetchByProjectId(id);
		return response;
	} catch (e) {
		console.error(e);
		throw new Error("Error fetching users");
	}
};

export {getProjectUsersByProjectId};
