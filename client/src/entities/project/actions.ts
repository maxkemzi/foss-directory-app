import {fetchAllProjects, fetchYourProjects} from "#src/shared/api/projects";
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

export {getAllProjects, getYourProjects};
