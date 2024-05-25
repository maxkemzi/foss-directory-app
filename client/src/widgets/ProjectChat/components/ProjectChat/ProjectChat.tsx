import {FC, ReactNode} from "react";

interface Props {
	sidebarSlot: ReactNode;
	headerSlot: ReactNode;
	bodySlot: ReactNode;
}

const ProjectChat: FC<Props> = ({sidebarSlot, headerSlot, bodySlot}) => {
	return (
		<div className="grid grid-cols-[200px,_1fr] grid-rows-[auto_60vh] gap-6">
			<div className="row-span-2">{sidebarSlot}</div>
			<div>{headerSlot}</div>
			<div className="h-full">{bodySlot}</div>
		</div>
	);
};

export default ProjectChat;
