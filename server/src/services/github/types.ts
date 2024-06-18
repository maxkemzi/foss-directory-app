import {GithubRepoDto} from "#src/dtos";

interface GetReposOptions {
	search?: string;
	limit: number;
	page: number;
	userId: string;
}

interface GetReposReturn {
	repos: GithubRepoDto[];
	totalCount: number;
}

export type {GetReposOptions, GetReposReturn};
