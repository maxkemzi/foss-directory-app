import {RoleDto} from "#src/services";
import {RequestHandler} from "express";
import {ParsedPaginationQuery, ParsedSearchQuery} from "../types";

type GetAllRequestHandler = RequestHandler<{}, RoleDto[], {}, unknown>;
type GetAllParsedQuery = ParsedPaginationQuery & ParsedSearchQuery;

export type {GetAllParsedQuery, GetAllRequestHandler};
