"use server";

import {fetchContributorsByProjectId} from "#src/apis/projects/contributors";

const getContributorsByProjectId = async (id: string) => {
	const contributors = await fetchContributorsByProjectId(id);
	return contributors;
};

export {getContributorsByProjectId};
