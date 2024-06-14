import {FC, ReactNode} from "react";

interface Props {
	sidebarSlot: ReactNode;
	headerSlot: ReactNode;
	bodySlot: ReactNode;
}

const ProjectChatLayout: FC<Props> = ({sidebarSlot, headerSlot, bodySlot}) => {
	return (
		<div className="relative overflow-hidden h-[70vh]">
			<div className="h-full max-md:flex max-md:flex-col md:flex md:gap-4">
				<div className="flex-shrink-0 w-[200px]">{sidebarSlot}</div>
				<div className="flex flex-col flex-grow gap-4">
					<div className="flex-shrink-0">{headerSlot}</div>
					<div className="h-full flex-grow overflow-hidden">{bodySlot}</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectChatLayout;
