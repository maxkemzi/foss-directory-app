import {RoleDto} from "../dtos";

interface GetOptions {
	search?: string;
	limit: number;
	offset: number;
}

interface GetReturn {
	roles: RoleDto[];
	totalCount: number;
}

export type {GetOptions, GetReturn};
