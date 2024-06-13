"use client";

import {ProjectList, useProjectList} from "#src/entities/project";
import {ProjectFromApi} from "#src/shared/apis";
import {ProjectCard} from "#src/widgets/ProjectCard";
import {Button, Spinner} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	initialProjects: ProjectFromApi[];
	initialHasMore: boolean;
	limit: number;
}

const List: FC<Props> = ({initialProjects, initialHasMore, limit}) => {
	const {projects, fetchMore, hasMore, isFetching} = useProjectList({
		variant: "all",
		initialProjects,
		initialHasMore,
		initialParams: {limit}
	});

	const handleClick = () => fetchMore();

	return (
		<div>
			<ProjectList>
				{projects.map(p => (
					<ProjectCard key={p.id} project={p} />
				))}
			</ProjectList>
			{isFetching || hasMore ? (
				<div className="flex justify-center mt-4">
					{isFetching ? (
						<Spinner />
					) : (
						<Button
							color="primary"
							isDisabled={isFetching}
							onClick={handleClick}
						>
							Load More
						</Button>
					)}
				</div>
			) : null}
		</div>
	);
};

export default List;
