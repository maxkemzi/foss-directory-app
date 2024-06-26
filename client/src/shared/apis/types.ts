interface SearchParams {
	[key: string]: string | number | boolean | null | undefined;
}

type PaginationSearchParams = {
	page?: number;
	limit?: number;
};

interface ApiResponse<Data = any> {
	data: Data;
}

interface ApiPaginationData {
	totalCount: number;
	page: number;
	limit: number;
	hasMore: boolean;
}

type ApiResponseWithPagination<Data = any> = ApiResponse<Data> &
	ApiPaginationData;

interface ProjectFromApi {
	id: string;
	name: string;
	description: string;
	repoUrl: string;
	ownerUser: {id: string; username: string};
	tags: {id: string; name: string}[];
	roles: {id: string; name: string; placesAvailable: number}[];
	memberCount: number;
	isRequestable: boolean;
}

interface TagFromApi {
	id: string;
	name: string;
}

interface RoleFromApi {
	id: string;
	name: string;
}

interface UserFromApi {
	id: string;
	username: string;
	email: string;
	avatar: string | null;
	githubIsConnected: boolean;
}

interface RepoFromApi {
	id: number;
	name: string;
	description: string | null;
	url: string;
	topics: string[];
}

interface ProjectRequestFromApi {
	id: string;
	user: {
		id: string;
		username: string;
	};
	project: {
		id: string;
		name: string;
	};
	role: {
		id: string;
		name: string;
	};
}

interface ProjectUserFromApi {
	id: string;
	user: {
		id: string;
		username: string;
		avatar: string;
	};
	role: {id: string; name: string};
	isOwner: boolean;
}

type BaseProjectMessageFromApi = {
	id: string;
	sender: {
		user: {
			id: string;
			username: string;
			avatar: string;
		};
		role: {id: string; name: string} | null;
		isOwner: boolean;
	} | null;
	createdAt: string;
	isSequential: boolean;
};
type ProjectMessageFromApi = BaseProjectMessageFromApi &
	({text: string; type: "regular"} | {text: null; type: "join" | "leave"});

export type {
	ApiPaginationData,
	ApiResponse,
	ApiResponseWithPagination,
	PaginationSearchParams,
	ProjectFromApi,
	ProjectMessageFromApi,
	ProjectRequestFromApi,
	ProjectUserFromApi,
	RepoFromApi,
	RoleFromApi,
	SearchParams,
	TagFromApi,
	UserFromApi
};
