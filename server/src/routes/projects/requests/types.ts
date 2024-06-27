import {ParsedPaginationQuery} from "#src/routes/types";
import {ProjectRequestDto} from "#src/services";
import {RequestHandler} from "express";

type CreateRequestHandler = RequestHandler<
	{},
	{id: string},
	{projectId: string; projectRoleId: string},
	{}
>;

type GetReceivedRequestHandler = RequestHandler<
	{},
	ProjectRequestDto[],
	{},
	unknown
>;
type GetReceivedParsedQuery = ParsedPaginationQuery;

type AcceptByIdRequestHandler = RequestHandler<
	{id: string},
	{success: boolean},
	{},
	{}
>;

type RejectByIdRequestHandler = RequestHandler<
	{id: string},
	{success: boolean},
	{},
	{}
>;

export type {
	AcceptByIdRequestHandler,
	CreateRequestHandler,
	GetReceivedParsedQuery,
	GetReceivedRequestHandler,
	RejectByIdRequestHandler
};
