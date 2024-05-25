import {DropdownItemProps} from "@nextui-org/react";

interface DropdownItemData {
	key: string;
	text: string;
	action: () => void;
	color: DropdownItemProps["color"];
}

export type {DropdownItemData};
