"use client";

import {ProjectFromApi} from "#src/shared/api";
import {MyTable, TableRowData} from "#src/shared/ui";
import {Link} from "@nextui-org/react";
import {FC, Key, ReactNode} from "react";
import {TableColumnKey, tableColumns} from "./constants";

interface Props {
	projects: ProjectFromApi[];
	renderActionsCell: (projectId: string) => ReactNode;
}

const ProjectTable: FC<Props> = ({projects, renderActionsCell}) => {
	const renderCell = (
		project: TableRowData<ProjectFromApi>,
		columnKey: Key
	): ReactNode => {
		const value = project[columnKey as keyof TableRowData<ProjectFromApi>];

		switch (columnKey) {
			case TableColumnKey.ACTIONS:
				return renderActionsCell(project.id);
			case TableColumnKey.REPO_URL:
				return (
					<Link
						href={value as string}
						target="_blank"
						rel="noopener noreferrer"
					>
						{value}
					</Link>
				);
			default:
				return <p>{value}</p>;
		}
	};

	const rows: TableRowData<ProjectFromApi>[] = projects.map(p => ({
		id: p.id,
		name: p.name,
		description: p.description,
		repoUrl: p.repoUrl,
		contributorCount: p.contributorCount
	}));

	return (
		<MyTable
			columns={tableColumns}
			rows={rows}
			renderCell={renderCell}
			emptyContent="You have no projects created"
		/>
	);
};

export default ProjectTable;
