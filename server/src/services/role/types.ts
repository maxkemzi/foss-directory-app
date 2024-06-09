import {RoleDto} from "#src/dtos";

interface GetAllOptions {
	limit: number;
	offset: number;
}

interface GetAllReturn {
	roles: RoleDto[];
	totalCount: number;
}

export type {GetAllOptions, GetAllReturn};
