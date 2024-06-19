import {PopulatedProjectDocument, ProjectPayload} from "#src/db";
import {ExtendedProjectDto} from "#src/dtos";

interface CreateProjectPayload extends ProjectPayload {
	role: string;
	tags: string[];
	roles: {[name: string]: number};
}

interface GetAllOptions {
	search?: string;
	limit: number;
	offset: number;
}

interface GetAllReturn {
	projects: ExtendedProjectDto[];
	totalCount: number;
}

interface GetByOwnerUserIdOptions {
	search?: string;
	limit: number;
	offset: number;
}

interface GetByOwnerUserIdReturn {
	projects: ExtendedProjectDto[];
	totalCount: number;
}

interface GetByMemberUserIdOptions {
	search?: string;
	limit: number;
	offset: number;
}

interface GetByMemberUserIdReturn {
	projects: ExtendedProjectDto[];
	totalCount: number;
}

interface ExtendedProject extends PopulatedProjectDocument {
	memberCount: number;
	isRequestable: boolean;
}

export type {
	CreateProjectPayload,
	GetAllOptions,
	GetAllReturn,
	GetByOwnerUserIdOptions,
	GetByOwnerUserIdReturn,
	GetByMemberUserIdOptions,
	GetByMemberUserIdReturn,
	ExtendedProject
};
