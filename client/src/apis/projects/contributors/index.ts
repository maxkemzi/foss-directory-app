import {fetchApiWithAuth} from "#src/actions/auth";
import {FetchContributorsResponse} from "#src/types/apis/projects/contributors";

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
