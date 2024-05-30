"use client";

import {ProjectFromApi} from "#src/shared/api";
import {YourProjectActionsDropdown} from "#src/widgets/YourProjectActionsDropdown";
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
				<YourProjectActionsDropdown projectId={projectId} />
			)}
		/>
	);
};

export default Table;
