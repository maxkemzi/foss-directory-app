"use server";

import {fetchProjectMessagesByProjectId} from "#src/shared/api/projects/messages";
import {getServerSession, logOut} from "#src/shared/auth";

const getProjectMessagesByProjectId = async (id: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const messages = await fetchProjectMessagesByProjectId(id);
		return messages;
	} catch (e) {
		throw new Error("Error fetching messages");
	}
};

export {getProjectMessagesByProjectId};
