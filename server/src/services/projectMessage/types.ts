import {ProjectMessageDto} from "../dtos";

type OmitFromUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

interface GetOptions {
	limit: number;
	offset: number;
}

interface GetReturn {
	messages: ProjectMessageDto[];
	totalCount: number;
}

export type {GetOptions, GetReturn, OmitFromUnion};
