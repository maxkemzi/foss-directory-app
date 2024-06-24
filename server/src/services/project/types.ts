import {ProjectPayload} from "#src/db";
import {ExtendedProjectDto} from "../dtos";

interface CreateProjectPayload extends ProjectPayload {
	role: string;
	tags: string[];
	roles: [string, number][];
}

interface GetOptions {
	search?: string;
	searchTags?: string[];
	limit: number;
	offset: number;
}

interface GetReturn {
	projects: ExtendedProjectDto[];
	totalCount: number;
}

export type {CreateProjectPayload, GetOptions, GetReturn};
