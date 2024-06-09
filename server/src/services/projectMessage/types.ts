import {ProjectMessageDto} from "#src/dtos";

interface GetByProjectIdOptions {
	limit: number;
	offset: number;
}

interface GetByProjectIdReturn {
	messages: ProjectMessageDto[];
	totalCount: number;
}

export type {GetByProjectIdOptions, GetByProjectIdReturn};
