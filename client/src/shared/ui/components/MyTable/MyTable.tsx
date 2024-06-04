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
		<Table
			fullWidth
			classNames={{
				wrapper: "max-h-[60vh]",
				td: "max-w-[300px] py-0"
			}}
		>
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
							return (
								<TableCell>
									<div className="py-2 overflow-auto whitespace-nowrap">
										{renderCell(row, columnKey)}
									</div>
								</TableCell>
							);
						}}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default MyTable;
