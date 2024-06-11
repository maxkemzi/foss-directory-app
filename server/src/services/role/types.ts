import {RoleDto} from "#src/dtos";

interface GetAllOptions {
	search?: string;
	limit: number;
	offset: number;
}

interface GetAllReturn {
	roles: RoleDto[];
	totalCount: number;
}

export type {GetAllOptions, GetAllReturn};
