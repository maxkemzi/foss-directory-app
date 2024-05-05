"use server";

import {GithubApi, ProjectsApi, RolesApi, TagsApi, isApiError} from "#src/apis";
import {CacheTag} from "#src/constants";
import {revalidateTag} from "next/cache";
import {INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const createProject = async (prevState: any, formData: FormData) => {
	const tagField = formData.get("tags");
	const rolesField = formData.get("roles");
	const validatedFields = VALIDATION_SCHEMA.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		repoUrl: formData.get("repoUrl")
	});

	if (!validatedFields.success) {
		return {
			...INITIAL_FORM_STATE,
			fieldErrors: validatedFields.error.flatten().fieldErrors
		};
	}

	try {
		await ProjectsApi.create({
			...validatedFields.data,
			tags: typeof tagField === "string" ? JSON.parse(tagField) : tagField,
			roles:
				typeof rolesField === "string" ? JSON.parse(rolesField) : rolesField
		});
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
	const tags = await TagsApi.fetchAll();
	return tags;
};

const getRoles = async () => {
	const roles = await RolesApi.fetchAll();
	return roles;
};

const getRepos = async () => {
	const repos = await GithubApi.fetchRepos();
	return repos;
};

export {createProject, getRepos, getRoles, getTags};
