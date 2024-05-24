"use server";

import {fetchContributorsByProjectId} from "#src/shared/api/projects/contributors";

const getContributorsByProjectId = async (id: string) => {
	try {
		const contributors = await fetchContributorsByProjectId(id);
		return contributors;
	} catch (e) {
		console.error(e);
		throw new Error("Error fetching contributors.");
	}
};

export {getContributorsByProjectId};
