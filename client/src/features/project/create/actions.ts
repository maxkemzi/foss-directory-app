"use server";

import githubApi from "#src/shared/apis/integrations/github";
import projectsApi from "#src/shared/apis/projects";
import {CacheTag} from "#src/shared/constants";
import {getErrorMessage} from "#src/shared/helpers";
import {revalidateTag} from "next/cache";
import {z} from "zod";
import {VALIDATION_SCHEMA} from "./constants";

const createProject = async (data: z.infer<typeof VALIDATION_SCHEMA>) => {
	try {
		const roles = data.roles.reduce((prev, curr) => {
			const [key, value] = curr;
			return {...prev, [key]: value};
		}, {});

		await projectsApi.create({...data, roles});
		revalidateTag(CacheTag.PROJECTS);

		return {success: "Project has been created"};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

const getGithubRepos = async () => {
	try {
		const response = await githubApi.fetchRepos();
		return {success: "Repos has been fetched", response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {createProject, getGithubRepos};
