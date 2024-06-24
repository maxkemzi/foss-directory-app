import {ProjectRequestDto} from "../dtos";

interface GetOptions {
	limit?: number;
	offset?: number;
}

interface GetReturn {
	requests: ProjectRequestDto[];
	totalCount: number;
}

export type {GetOptions, GetReturn};
