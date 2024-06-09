import {ProjectPayload} from "#src/db";
import {ProjectWithDetailsDto} from "#src/dtos";

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
	projects: ProjectWithDetailsDto[];
	totalCount: number;
}

interface GetByOwnerUserIdOptions {
	search?: string;
	limit: number;
	offset: number;
}

interface GetByOwnerUserIdReturn {
	projects: ProjectWithDetailsDto[];
	totalCount: number;
}

interface GetByMemberUserIdOptions {
	search?: string;
	limit: number;
	offset: number;
}

interface GetByMemberUserIdReturn {
	projects: ProjectWithDetailsDto[];
	totalCount: number;
}

export type {
	CreateProjectPayload,
	GetAllOptions,
	GetAllReturn,
	GetByOwnerUserIdOptions,
	GetByOwnerUserIdReturn,
	GetByMemberUserIdOptions,
	GetByMemberUserIdReturn
};
