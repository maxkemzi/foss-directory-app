import {ParsedPaginationQuery} from "#src/routes/types";
import {ProjectUserDto} from "#src/services";
import {RequestHandler} from "express";

type GetByProjectIdRequestHandler = RequestHandler<
	{id: string},
	ProjectUserDto[],
	{},
	unknown
>;
type GetByProjectIdParsedQuery = ParsedPaginationQuery;

export type {GetByProjectIdRequestHandler, GetByProjectIdParsedQuery};
