import {fetchApiWithAuth} from "#src/shared/auth";
import {FetchContributorsResponse} from "./types";

const BASE_URL = "/projects";

const fetchContributorsByProjectId = async (
	id: string
): Promise<FetchContributorsResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/contributors`);
	return response.json();
};

const fetchLeaveProject = async (projectId: string): Promise<void> => {
	const response = await fetchApiWithAuth(
		`${BASE_URL}/${projectId}/contributors/leave`,
		{method: "DELETE"}
	);
	return response.json();
};

export {fetchContributorsByProjectId, fetchLeaveProject};
