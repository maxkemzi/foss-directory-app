"use server";

import {ApiError, ProjectsApi, TagsApi} from "#src/api";
import {Pathname} from "#src/constants";
import {revalidatePath} from "next/cache";
import {INITIAL_FORM_STATE, VALIDATION_SCHEMA} from "./constants";

const createProject = async (prevState: any, formData: FormData) => {
	const tagField = formData.get("tags");
	const validatedFields = VALIDATION_SCHEMA.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		repoUrl: formData.get("repoUrl"),
		tags: typeof tagField === "string" ? JSON.parse(tagField) : tagField
	});

	if (!validatedFields.success) {
		return {
			...INITIAL_FORM_STATE,
			fieldErrors: validatedFields.error.flatten().fieldErrors
		};
	}

	try {
		await ProjectsApi.create(validatedFields.data);
		revalidatePath(Pathname.PROJECTS);

		return {...INITIAL_FORM_STATE, success: true};
	} catch (e) {
		console.log(e);

		return {
			...INITIAL_FORM_STATE,
			error: e instanceof ApiError ? e.message : "Something went wrong."
		};
	}
};

const getTags = async () => {
	const tags = await TagsApi.fetchAll();
	return tags;
};

export {createProject, getTags};
