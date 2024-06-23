"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectsApi from "#src/shared/apis/projects";
import {CacheTag} from "#src/shared/constants";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";
import {revalidateTag} from "next/cache";
import {z} from "zod";
import {VALIDATION_SCHEMA} from "./constants";

const createProject = async (data: z.infer<typeof VALIDATION_SCHEMA>) => {
	try {
		await projectsApi.create(data);
		revalidateTag(CacheTag.PROJECTS);
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error creating project";
		throw new AppError(message);
	}
};

const safeCreateProject: SafeAction<typeof createProject> = async data => {
	try {
		await createProject(data);
		return {success: "Project has been created"};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {safeCreateProject};
