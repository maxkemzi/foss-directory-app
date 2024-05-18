"use server";

import {fetchProjectMessages} from "#src/apis/projects/messages";
import {Pathname} from "#src/constants";
import {redirect} from "next/navigation";

const getProjectMessages = async (projectId: string) => {
	try {
		const messages = await fetchProjectMessages(projectId);
		return messages;
	} catch (e) {
		console.log(e);
		return redirect(Pathname.CHATS);
	}
};

export {getProjectMessages};
