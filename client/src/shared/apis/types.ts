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
	totalPages: number;
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
	isOwner: boolean;
	isMember: boolean;
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
	description: string;
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

interface ProjectMessageFromApi {
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
	text: string;
	type: "regular" | "join" | "date";
	createdAt: string;
}

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
