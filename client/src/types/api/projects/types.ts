import {ProjectFromApi} from "../types";

type FetchProjectsResponse = ProjectFromApi[];

interface CreateProjectBody {
	name: string;
	description: string;
	repoUrl: string;
	tags: string[];
}

type CreateProjectResponse = ProjectFromApi;

export type {FetchProjectsResponse, CreateProjectBody, CreateProjectResponse};
