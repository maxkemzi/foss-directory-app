import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@nextui-org/react";
import {FC, Key} from "react";
import {DropdownItemData} from "../../types";

interface Props {
	items: DropdownItemData[];
}

const EllipsisDropdown: FC<Props> = ({items}) => {
	const handleAction = (key: Key) => {
		const item = items.find(i => i.key === key);
		if (!item) {
			return;
		}

		item.action();
	};

	return (
		<Dropdown classNames={{content: "min-w-[100px]"}}>
			<DropdownTrigger>
				<Button isIconOnly>
					<EllipsisVerticalIcon className="w-[24px] h-[24px]" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				onAction={handleAction}
				aria-label="Static Actions"
				items={items}
			>
				{item => (
					<DropdownItem
						key={item.key}
						className={`text-${item.color}`}
						color={item.color}
					>
						{item.text}
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
};

export default EllipsisDropdown;
