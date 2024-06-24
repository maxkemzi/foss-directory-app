import {ProjectUserDto} from "../dtos";

interface GetOptions {
	limit: number;
	offset: number;
}

interface GetReturn {
	users: ProjectUserDto[];
	totalCount: number;
}

export type {GetOptions, GetReturn};
