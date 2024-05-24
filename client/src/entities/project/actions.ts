import {
	fetchAllProjects,
	fetchContributedProjects,
	fetchMyProjects,
	fetchProjectById
} from "#src/shared/api/projects";
import {fetchProjectMessages} from "#src/shared/api/projects/messages";
import {getServerSession, logOut} from "#src/shared/auth";

const getAllProjects = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const projects = await fetchAllProjects();
		return projects;
	} catch (e) {
		throw new Error("Error fetching projects.");
	}
};

const getMyProjects = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const projects = await fetchMyProjects();
		return projects;
	} catch (e) {
		throw new Error("Error fetching your projects.");
	}
};

const getContributedProjects = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const projects = await fetchContributedProjects();
		return projects;
	} catch (e) {
		throw new Error("Error fetching projects.");
	}
};

const getProjectChatData = async (
	id: string
): Promise<[FetchProjectResponse, FetchProjectMessagesResponse]> => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const [project, messages] = await Promise.all([
			fetchProjectById(id),
			fetchProjectMessages(id)
		]);
		return [project, messages];
	} catch (e) {
		throw new Error("Error fetching project chat data.");
	}
};

export {
	getAllProjects,
	getContributedProjects,
	getMyProjects,
	getProjectChatData
};
