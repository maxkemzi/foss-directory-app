"use client";

import {
	Table,
	TableBody,
	TableBodyProps,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from "@nextui-org/react";
import {FC, Key, ReactNode} from "react";
import {TableColumnData, TableRowData} from "../../types";

interface Props {
	columns: TableColumnData[];
	rows: TableRowData[];
	renderCell: (row: TableRowData, columnKey: Key) => ReactNode;
	emptyContent: TableBodyProps<TableRowData>["emptyContent"];
}

const MyTable: FC<Props> = ({columns, rows, renderCell, emptyContent}) => {
	return (
		<Table>
			<TableHeader columns={columns}>
				{column => (
					<TableColumn key={column.key} className="uppercase">
						{column.text}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={rows} emptyContent={emptyContent}>
				{row => (
					<TableRow key={row.id}>
						{columnKey => {
							return <TableCell>{renderCell(row, columnKey)}</TableCell>;
						}}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default MyTable;
