import {TagDto} from "#src/services";
import {RequestHandler} from "express";
import {ParsedPaginationQuery, ParsedSearchQuery} from "../types";

type GetAllRequestHandler = RequestHandler<{}, TagDto[], {}, unknown>;
type GetAllParsedQuery = ParsedPaginationQuery & ParsedSearchQuery;

export type {GetAllParsedQuery, GetAllRequestHandler};
