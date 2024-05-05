import {ProjectFromApi} from "..";

type FetchProjectsResponse = ProjectFromApi[];

interface CreateProjectBody {
	name: string;
	description: string;
	repoUrl: string;
	tags: string[];
	roles: string[];
}

type CreateProjectResponse = ProjectFromApi;

export type {CreateProjectBody, CreateProjectResponse, FetchProjectsResponse};
