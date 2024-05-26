"use client";

import {ProjectFromApi} from "#src/shared/api";
import {ProjectActionsDropdown} from "#src/widgets/ProjectActionsDropdown";
import {ProjectTable} from "#src/widgets/ProjectTable";
import {FC} from "react";

interface Props {
	projects: ProjectFromApi[];
}

const Table: FC<Props> = ({projects}) => {
	return (
		<ProjectTable
			projects={projects}
			renderActionsCell={projectId => (
				<ProjectActionsDropdown projectId={projectId} />
			)}
		/>
	);
};

export default Table;
