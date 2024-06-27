type PaginationQuery = {
	page: string;
	limit: string;
};

type ParsedPaginationQuery = {
	page: number;
	limit: number;
};

type SearchQuery = {
	search: string;
};

type ParsedSearchQuery = {
	search: string;
};

export type {
	PaginationQuery,
	SearchQuery,
	ParsedPaginationQuery,
	ParsedSearchQuery
};
