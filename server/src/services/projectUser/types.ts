import {ProjectUserDto} from "#src/dtos";

interface GetByProjectIdOptions {
	limit: number;
	offset: number;
}

interface GetByProjectIdReturn {
	users: ProjectUserDto[];
	totalCount: number;
}

export type {GetByProjectIdOptions, GetByProjectIdReturn};
