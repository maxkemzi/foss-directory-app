"use server";

import {fetchMyGithubRepos} from "#src/shared/api/integrations/github";
import {fetchCreateProject} from "#src/shared/api/projects";
import {fetchAllRoles} from "#src/shared/api/roles";
import {fetchAllTags} from "#src/shared/api/tags";
import {CacheTag} from "#src/shared/constants";
import {revalidateTag} from "next/cache";
import {FormState, INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const createProjectWithValidation = async (
	prevState: FormState,
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

		return {
			...INITIAL_FORM_STATE,
			triggerStatusHandler: prevState.triggerStatusHandler,
			success: true
		};
	} catch (e) {
		console.error(e);
		return {
			...INITIAL_FORM_STATE,
			triggerStatusHandler: prevState.error
				? !prevState.triggerStatusHandler
				: prevState.triggerStatusHandler,
			error: "Error creating project"
		};
	}
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

const getMyGithubRepos = async () => {
	try {
		const repos = await fetchMyGithubRepos();
		return repos;
	} catch (e) {
		console.error(e);
		throw new Error("Error fetching repos");
	}
};

export {createProjectWithValidation, getAllRoles, getAllTags, getMyGithubRepos};
