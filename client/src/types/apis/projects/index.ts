import {ProjectFromApi} from "..";

type FetchProjectsResponse = ProjectFromApi[];

type FetchProjectResponse = ProjectFromApi;

interface CreateProjectBody {
	name: string;
	description: string;
	repoUrl: string;
	role: string;
	tags: string[];
	roles: Record<string, number>;
}

type CreateProjectResponse = ProjectFromApi;

export type {
	CreateProjectBody,
	CreateProjectResponse,
	FetchProjectsResponse,
	FetchProjectResponse
};
