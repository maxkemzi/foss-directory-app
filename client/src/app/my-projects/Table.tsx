"use client";

import {ProjectFromApi} from "#src/shared/api";
import {OwnedProjectActionsDropdown} from "#src/widgets/OwnedProjectActionsDropdown";
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
				<OwnedProjectActionsDropdown projectId={projectId} />
			)}
		/>
	);
};

export default Table;
