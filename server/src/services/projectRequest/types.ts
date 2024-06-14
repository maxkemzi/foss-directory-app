import {ProjectRequestDto} from "#src/dtos";

interface GetByReceiverUserIdOptions {
	limit?: number;
	offset?: number;
}

interface GetByReceiverUserIdReturn {
	requests: ProjectRequestDto[];
	totalCount: number;
}

export type {GetByReceiverUserIdOptions, GetByReceiverUserIdReturn};
