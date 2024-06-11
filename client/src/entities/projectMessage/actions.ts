"use server";

import projectMessagesApi from "#src/shared/apis/projects/messages";
import {getServerSession, logOut} from "#src/shared/auth";

const getProjectMessagesByProjectId = async (id: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const response = await projectMessagesApi.fetchByProjectId(id);
		return response;
	} catch (e) {
		throw new Error("Error fetching messages");
	}
};

export {getProjectMessagesByProjectId};
