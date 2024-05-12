import {ProjectRequestFromApi} from "../..";

type ProjectRequestResponse = {success: boolean};

interface ProjectRequestBody {
	projectId: string;
	projectRoleId: string;
}

type FetchRoleRequestsResponse = ProjectRequestFromApi[];

export type {
	FetchRoleRequestsResponse,
	ProjectRequestBody,
	ProjectRequestResponse
};
