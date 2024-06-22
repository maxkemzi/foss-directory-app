import {PopulatedProjectDocument, ProjectPayload} from "#src/db";
import {ExtendedProjectDto} from "#src/dtos";

interface CreateProjectPayload extends ProjectPayload {
	role: string;
	tags: string[];
	roles: {[name: string]: number};
}

interface GetOptions {
	search?: string;
	tagsToSearch?: string[];
	limit: number;
	offset: number;
}

interface GetReturn {
	projects: ExtendedProjectDto[];
	totalCount: number;
}

interface ExtendedProject extends PopulatedProjectDocument {
	memberCount: number;
	isRequestable: boolean;
}

export type {CreateProjectPayload, GetOptions, GetReturn, ExtendedProject};
