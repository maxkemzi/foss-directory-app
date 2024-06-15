"use client";

import {ProjectFromApi} from "#src/shared/apis";
import {MyTable, TableRowData} from "#src/shared/ui";
import {
	Link,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from "@nextui-org/react";
import {FC, Key, ReactNode, useMemo} from "react";
import {TableColumnKey, tableColumns} from "./constants";

interface Props {
	projects: ProjectFromApi[];
	renderActionsCell: (projectId: string) => ReactNode;
	bottomContent?: ReactNode;
}

const ProjectTable: FC<Props> = ({
	projects,
	renderActionsCell,
	bottomContent
}) => {
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

	const rows: TableRowData<ProjectFromApi>[] = useMemo(
		() =>
			projects.map(p => ({
				id: p.id,
				name: p.name,
				description: p.description,
				repoUrl: p.repoUrl,
				memberCount: p.memberCount
			})),
		[projects]
	);

	return (
		<MyTable bottomContent={bottomContent}>
			<TableHeader columns={tableColumns}>
				{column => <TableColumn key={column.key}>{column.text}</TableColumn>}
			</TableHeader>
			<TableBody items={rows} emptyContent="You have no projects created">
				{row => (
					<TableRow key={row.id}>
						{columnKey => {
							return <TableCell>{renderCell(row, columnKey)}</TableCell>;
						}}
					</TableRow>
				)}
			</TableBody>
		</MyTable>
	);
};

export default ProjectTable;
