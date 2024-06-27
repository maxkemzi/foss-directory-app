import {ExtendedProjectDto} from "#src/services";
import {RequestHandler} from "express";
import {ParsedPaginationQuery, ParsedSearchQuery} from "../types";

type Variant = "all" | "owner" | "member";

type CreateRequestHandler = RequestHandler<
	{},
	{id: string},
	{
		name: string;
		description: string;
		tags: string[];
		roles: [string, number][];
		repoUrl: string;
		role: string;
	},
	{}
>;

type GetAllRequestHandler = RequestHandler<
	{},
	ExtendedProjectDto[],
	{},
	unknown
>;
type GetAllParsedQuery = ParsedPaginationQuery &
	ParsedSearchQuery & {
		variant: Variant;
		searchTags: string[];
	};

type DeleteByIdRequestHandler = RequestHandler<
	{id: string},
	{success: true},
	{},
	{}
>;

type GetByIdRequestHandler = RequestHandler<
	{id: string},
	ExtendedProjectDto,
	{},
	{}
>;

type LeaveByIdRequestHandler = RequestHandler<
	{id: string},
	{success: true},
	{},
	{}
>;

export type {
	CreateRequestHandler,
	DeleteByIdRequestHandler,
	GetAllParsedQuery,
	GetAllRequestHandler,
	GetByIdRequestHandler,
	LeaveByIdRequestHandler,
	Variant
};
