"use client";

import {Table, TableProps} from "@nextui-org/react";
import {FC} from "react";

const MyTable: FC<TableProps> = ({children, classNames, ...rest}) => {
	return (
		<Table
			fullWidth
			classNames={{
				wrapper: "max-h-[70vh]",
				th: "uppercase",
				td: "max-w-[300px] py-2 overflow-auto whitespace-nowrap",
				...classNames
			}}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
		>
			{children}
		</Table>
	);
};

export default MyTable;
