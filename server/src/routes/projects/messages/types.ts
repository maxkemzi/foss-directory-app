import {ParsedPaginationQuery} from "#src/routes/types";
import {ProjectMessageDto} from "#src/services";
import {RequestHandler} from "express";

type GetByProjectIdRequestHandler = RequestHandler<
	{id: string},
	ProjectMessageDto[],
	{},
	unknown
>;
type GetByProjectIdParsedQuery = ParsedPaginationQuery;

export type {GetByProjectIdParsedQuery, GetByProjectIdRequestHandler};
