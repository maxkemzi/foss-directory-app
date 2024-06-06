"use client";

import {Project} from "#src/entities/project";
import {ProjectRole, ProjectRoleList} from "#src/entities/projectRole";
import {ProjectTag, ProjectTagList} from "#src/entities/projectTag";
import {
	SendProjectRequestModal,
	SendProjectRequestModalProps
} from "#src/features/projectRequest/send";
import {ProjectFromApi} from "#src/shared/api";
import {useModal} from "#src/shared/modal";
import {FC, useCallback} from "react";

interface Props {
	project: ProjectFromApi;
}

const ProjectCard: FC<Props> = ({project}) => {
	const {id, roles, tags, requestable} = project;
	const {openModal} = useModal();

	const handleClick = useCallback(
		(projectRoleId: string) => {
			openModal<SendProjectRequestModalProps>({
				component: SendProjectRequestModal,
				props: {projectId: id, projectRoleId}
			});
		},
		[id, openModal]
	);

	return (
		<Project
			project={project}
			topSlot={
				<ProjectRoleList>
					{roles.map(r => (
						<li key={r.id}>
							<button
								aria-label="request project role"
								type="button"
								onClick={() => handleClick(r.id)}
								disabled={!requestable}
							>
								<ProjectRole role={r} />
							</button>
						</li>
					))}
				</ProjectRoleList>
			}
			bottomSlot={
				<ProjectTagList>
					{tags.map(t => (
						<li key={t.id}>
							<ProjectTag tag={t} />
						</li>
					))}
				</ProjectTagList>
			}
		/>
	);
};

export default ProjectCard;