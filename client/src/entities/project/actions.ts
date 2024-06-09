import {
	fetchAllProjects,
	fetchOwnedProjects,
	fetchProjectById,
	fetchProjectsByMembership
} from "#src/shared/api/projects";
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

const getOwnedProjects = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const projects = await fetchOwnedProjects();
		return projects;
	} catch (e) {
		throw new Error("Error fetching projects");
	}
};

const getProjectsByMembership = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const projects = await fetchProjectsByMembership();
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

export {
	getAllProjects,
	getOwnedProjects,
	getProjectsByMembership,
	getProjectById
};
