import {TagDto} from "#src/dtos";

interface GetAllOptions {
	search?: string;
	offset: number;
	limit: number;
}

interface GetAllReturn {
	tags: TagDto[];
	totalCount: number;
}

export type {GetAllOptions, GetAllReturn};
