import {
	fetchAllProjects,
	fetchContributedProjects,
	fetchYourProjects,
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
		throw new Error("Error fetching projects");
	}
};

const getYourProjects = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const projects = await fetchYourProjects();
		return projects;
	} catch (e) {
		throw new Error("Error fetching your projects");
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
		throw new Error("Error fetching projects");
	}
};

const getProjectById = async (id: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const project = await fetchProjectById(id);
		return project;
	} catch (e) {
		throw new Error("Error fetching project");
	}
};

const getProjectMessages = async (id: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const messages = await fetchProjectMessages(id);
		return messages;
	} catch (e) {
		throw new Error("Error fetching project messages");
	}
};

export {
	getAllProjects,
	getContributedProjects,
	getYourProjects,
	getProjectById,
	getProjectMessages
};
