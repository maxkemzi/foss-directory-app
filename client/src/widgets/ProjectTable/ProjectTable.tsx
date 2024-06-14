"use client";

import {FetchMoreButton} from "#src/features/fetchMore";
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
import {FC, Key, ReactNode} from "react";
import {TableColumnKey, tableColumns} from "./constants";

interface Props {
	projects: ProjectFromApi[];
	onFetchMore?: () => void;
	isFetching?: boolean;
	hasMore?: boolean;
	renderActionsCell: (projectId: string) => ReactNode;
}

const ProjectTable: FC<Props> = ({
	projects,
	isFetching,
	hasMore,
	renderActionsCell,
	onFetchMore
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

	const rows: TableRowData<ProjectFromApi>[] = projects.map(p => ({
		id: p.id,
		name: p.name,
		description: p.description,
		repoUrl: p.repoUrl,
		memberCount: p.memberCount
	}));

	return (
		<MyTable
			bottomContent={
				hasMore ? (
					<FetchMoreButton
						className="mt-4"
						isFetching={isFetching}
						onFetchMore={onFetchMore}
					/>
				) : null
			}
		>
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
