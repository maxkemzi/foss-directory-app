"use server";

import {fetchYourGithubRepos} from "#src/shared/api/integrations/github";
import {fetchCreateProject} from "#src/shared/api/projects";
import {fetchAllRoles} from "#src/shared/api/roles";
import {fetchAllTags} from "#src/shared/api/tags";
import {CacheTag} from "#src/shared/constants";
import {revalidateTag} from "next/cache";
import {FormFields} from "./types";

const createProjectWithData = async (data: FormFields) => {
	await fetchCreateProject(data);
	revalidateTag(CacheTag.PROJECTS);
};

const getAllTags = async () => {
	try {
		const tags = await fetchAllTags();
		return tags;
	} catch (e) {
		console.error(e);
		throw new Error("Error fetching tags");
	}
};

const getAllRoles = async () => {
	try {
		const roles = await fetchAllRoles();
		return roles;
	} catch (e) {
		console.error(e);
		throw new Error("Error fetching roles");
	}
};

const getYourGithubRepos = async () => {
	try {
		const repos = await fetchYourGithubRepos();
		return repos;
	} catch (e) {
		console.error(e);
		throw new Error("Error fetching repos");
	}
};

export {createProjectWithData, getAllRoles, getAllTags, getYourGithubRepos};
