"use client";

import {
	RequestProjectModal,
	RequestProjectModalProps
} from "#src/features/project/requestProject";
import {ProjectFromApi} from "#src/shared/api";
import {useModal} from "#src/shared/modal";
import {FC} from "react";
import ProjectRole from "../ProjectRole/ProjectRole";

interface Props {
	roles: ProjectFromApi["roles"];
	projectId: string;
	requestable: boolean;
}

const ProjectRoles: FC<Props> = ({roles, projectId, requestable}) => {
	const {openModal} = useModal();

	const handleClick = (projectRoleId: string) => {
		openModal<RequestProjectModalProps>({
			component: RequestProjectModal,
			props: {projectId, projectRoleId}
		});
	};

	return (
		<div className="flex gap-x-2 overflow-x-auto">
			{roles.map(r => (
				<ProjectRole
					key={r.id}
					projectRole={r}
					onClick={() => handleClick(r.id)}
					disabled={!requestable}
				/>
			))}
		</div>
	);
};

export default ProjectRoles;
