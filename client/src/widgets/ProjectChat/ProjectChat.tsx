import {FC, ReactNode} from "react";

interface Props {
	sidebarSlot: ReactNode;
	headerSlot: ReactNode;
	bodySlot: ReactNode;
}

const ProjectChat: FC<Props> = ({sidebarSlot, headerSlot, bodySlot}) => {
	return (
		<div className="relative overflow-hidden">
			<div className="max-md:flex max-md:flex-col md:grid md:grid-cols-[200px,_1fr] md:grid-rows-[auto_60vh] md:gap-6">
				<div className="md:row-span-2">{sidebarSlot}</div>
				<div className="max-md:mb-6">{headerSlot}</div>
				<div className="max-md:h-[60vh]">{bodySlot}</div>
			</div>
		</div>
	);
};

export default ProjectChat;
