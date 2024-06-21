"use client";

import {useProjectList} from "#src/entities/project";
import {FetchMoreButton} from "#src/features/fetchMore";
import {FetchProjectsResponse} from "#src/shared/apis/projects";
import {ProjectTable} from "#src/widgets/ProjectTable";
import {YourProjectActionsDropdown} from "#src/widgets/YourProjectActionsDropdown";
import {FC} from "react";

interface Props {
	response: FetchProjectsResponse;
}

const Table: FC<Props> = ({response}) => {
	const {projects, isFetching, hasMore, fetchMore} = useProjectList(
		"owned",
		response
	);

	return (
		<ProjectTable
			projects={projects}
			renderActionsCell={projectId => (
				<YourProjectActionsDropdown projectId={projectId} />
			)}
			bottomContent={
				hasMore ? (
					<FetchMoreButton
						className="mt-4"
						isFetching={isFetching}
						onFetchMore={fetchMore}
					/>
				) : null
			}
		/>
	);
};

export default Table;
