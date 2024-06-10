"use server";

import {fetchGithubRepos} from "#src/shared/api/integrations/github";
import {isApiError} from "#src/shared/api/lib";
import {fetchCreateProject} from "#src/shared/api/projects";
import {fetchAllRoles} from "#src/shared/api/roles";
import {fetchAllTags} from "#src/shared/api/tags";
import {CacheTag} from "#src/shared/constants";
import {revalidateTag} from "next/cache";
import {z} from "zod";
import {VALIDATION_SCHEMA} from "./constants";

const createProject = async (data: z.infer<typeof VALIDATION_SCHEMA>) => {
	try {
		const roles = data.roles.reduce((prev, curr) => {
			const [key, value] = curr;
			return {...prev, [key]: value};
		}, {});

		await fetchCreateProject({...data, roles});
		revalidateTag(CacheTag.PROJECTS);

		return {success: "Project has been created"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error creating project";
		return {error};
	}
};

const getAllTags = async () => {
	try {
		const tags = await fetchAllTags();
		return {success: "Tags has been fetched", tags};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error fetching tags";
		return {error};
	}
};

const getAllRoles = async () => {
	try {
		const roles = await fetchAllRoles();
		return {success: "Roles has been fetched", roles};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error fetching roles";
		return {error};
	}
};

const getGithubRepos = async () => {
	try {
		const repos = await fetchGithubRepos();
		return {success: "Repos has been fetched", repos};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error fetching repos";
		return {error};
	}
};

export {createProject, getAllRoles, getAllTags, getGithubRepos};
