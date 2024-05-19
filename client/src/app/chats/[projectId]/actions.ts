"use server";

import {fetchProjectById} from "#src/apis/projects";
import {fetchProjectMessages} from "#src/apis/projects/messages";
import {Pathname} from "#src/constants";
import {FetchProjectMessagesResponse} from "#src/types/apis/projects/messages";
import {FetchProjectResponse} from "#src/types/apis/projects";
import {redirect} from "next/navigation";

const getProjectData = async (
	id: string
): Promise<[FetchProjectResponse, FetchProjectMessagesResponse]> => {
	try {
		const [project, messages] = await Promise.all([
			fetchProjectById(id),
			fetchProjectMessages(id)
		]);
		return [project, messages];
	} catch (e) {
		console.log(e);
		return redirect(Pathname.CHATS);
	}
};

export {getProjectData};
