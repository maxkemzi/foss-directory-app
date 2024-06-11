import {isApiError} from "#src/shared/apis/lib";
import projectsApi from "#src/shared/apis/projects";
import {getServerSession, logOut} from "#src/shared/auth";
import {AppError} from "#src/shared/error";

const getAllProjects = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const response = await projectsApi.fetchAll();
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching projects";
		throw new AppError(message);
	}
};

const getProjectsByOwnership = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const response = await projectsApi.fetchByOwnership();
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching projects";
		throw new AppError(message);
	}
};

const getProjectsByMembership = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const response = await projectsApi.fetchByMembership();
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching projects";
		throw new AppError(message);
	}
};

const getProjectById = async (id: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const response = await projectsApi.fetchById(id);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching project";
		throw new AppError(message);
	}
};

export {
	getAllProjects,
	getProjectsByOwnership,
	getProjectsByMembership,
	getProjectById
};
