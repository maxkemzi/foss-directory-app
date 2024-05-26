import {DropdownItemProps} from "@nextui-org/react";
import {ReactNode} from "react";

interface DropdownItemData {
	key: string;
	text: string;
	action: () => void;
	color: DropdownItemProps["color"];
}

interface TableColumnData {
	key: string;
	text: string;
}

type NonObjectKey<T> = {
	[K in keyof T]: T[K] extends object ? never : K;
}[keyof T];
type TableRowData<T = {id: string}> = {id: string} & {
	[K in NonObjectKey<T>]?: T[K];
};

interface TableCellData {
	columnKey: string;
	element?: ReactNode;
}

export type {DropdownItemData, TableCellData, TableColumnData, TableRowData};
