import {RoleRequestFromApi} from "../..";

type RequestRoleResponse = {success: boolean};

interface RequestRoleBody {
	projectRoleId: number;
}

type FetchRoleRequestsResponse = RoleRequestFromApi[];

export type {FetchRoleRequestsResponse, RequestRoleBody, RequestRoleResponse};
