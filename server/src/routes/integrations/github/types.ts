import {ParsedPaginationQuery, ParsedSearchQuery} from "#src/routes/types";
import {GithubRepoDto} from "#src/services";
import {RequestHandler} from "express";

type GetAuthUrlRequestHandler = RequestHandler<
	{},
	{csrfToken: string; url: string},
	{},
	{code: string; state: string}
>;

type ConnectRequestHandler = RequestHandler<
	{},
	{},
	{},
	{code: string; state: string}
>;

type GetReposParsedQuery = ParsedPaginationQuery & ParsedSearchQuery;
type GetReposRequestHandler = RequestHandler<{}, GithubRepoDto[], {}, unknown>;

export type {
	ConnectRequestHandler,
	GetAuthUrlRequestHandler,
	GetReposParsedQuery,
	GetReposRequestHandler
};
