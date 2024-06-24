import {TagDto} from "../dtos";

interface GetOptions {
	search?: string;
	offset: number;
	limit: number;
}

interface GetReturn {
	tags: TagDto[];
	totalCount: number;
}

export type {GetOptions, GetReturn};
