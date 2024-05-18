"use server";

import {fetchMyGithubRepos} from "#src/apis/integrations/github";
import {fetchCreateProject} from "#src/apis/projects";
import {fetchAllRoles} from "#src/apis/roles";
import {fetchAllTags} from "#src/apis/tags";
import {CacheTag} from "#src/constants";
import {isApiError} from "#src/lib";
import {revalidateTag} from "next/cache";
import {INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const createProjectWithValidation = async (
	prevState: any,
	formData: FormData
) => {
	const tagsField = formData.get("tags");
	const rolesField = formData.get("roles");
	const validatedFields = VALIDATION_SCHEMA.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		repoUrl: formData.get("repoUrl"),
		role: formData.get("role"),
		tags: typeof tagsField === "string" ? JSON.parse(tagsField) : null,
		roles: typeof rolesField === "string" ? JSON.parse(rolesField) : null
	});

	if (!validatedFields.success) {
		return {
			...INITIAL_FORM_STATE,
			fieldErrors: validatedFields.error.flatten().fieldErrors
		};
	}

	try {
		await fetchCreateProject(validatedFields.data);
		revalidateTag(CacheTag.PROJECTS);

		return {...INITIAL_FORM_STATE, success: true};
	} catch (e) {
		console.log(e);

		return {
			...INITIAL_FORM_STATE,
			error: isApiError(e) ? e.message : "Something went wrong."
		};
	}
};

const getTags = async () => {
	const tags = await fetchAllTags();
	return tags;
};

const getRoles = async () => {
	const roles = await fetchAllRoles();
	return roles;
};

const getGithubRepos = async () => {
	const repos = await fetchMyGithubRepos();
	return repos;
};

export {createProjectWithValidation, getGithubRepos, getRoles, getTags};
