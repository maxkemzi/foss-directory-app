"use client";

import {useProjectList} from "#src/entities/project";
import {FetchProjectsResponse} from "#src/shared/apis/projects";
import {ProjectTable} from "#src/widgets/ProjectTable";
import {YourProjectActionsDropdown} from "#src/widgets/YourProjectActionsDropdown";
import {FC} from "react";

interface Props {
	response: FetchProjectsResponse;
}

const Table: FC<Props> = ({response}) => {
	const {projects, isFetching, hasMore, fetchMore} = useProjectList(
		"ownership",
		response
	);

	return (
		<ProjectTable
			projects={projects}
			isFetching={isFetching}
			hasMore={hasMore}
			onFetchMore={fetchMore}
			renderActionsCell={projectId => (
				<YourProjectActionsDropdown projectId={projectId} />
			)}
		/>
	);
};

export default Table;
