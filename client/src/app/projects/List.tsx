"use client";

import {ProjectList, useProjectList} from "#src/entities/project";
import {FetchMoreButton} from "#src/features/fetchMore";
import {FetchProjectsResponse} from "#src/shared/apis/projects";
import {ProjectCard} from "#src/widgets/ProjectCard";
import {FC} from "react";

interface Props {
	response: FetchProjectsResponse;
}

const List: FC<Props> = ({response}) => {
	const {projects, fetchMore, hasMore, isFetching} = useProjectList(
		"all",
		response
	);

	return (
		<div>
			<ProjectList>
				{projects.map(p => (
					<ProjectCard key={p.id} project={p} />
				))}
			</ProjectList>
			{hasMore ? (
				<FetchMoreButton
					className="mt-4"
					isFetching={isFetching}
					onFetchMore={fetchMore}
				/>
			) : null}
		</div>
	);
};

export default List;
