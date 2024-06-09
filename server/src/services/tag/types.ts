import {TagDto} from "#src/dtos";

interface GetAllOptions {
	offset: number;
	limit: number;
}

interface GetAllReturn {
	tags: TagDto[];
	totalCount: number;
}

export type {GetAllOptions, GetAllReturn};
