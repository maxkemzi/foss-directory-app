import {FC, PropsWithChildren} from "react";

const ProjectChatList: FC<PropsWithChildren> = ({children}) => {
	return (
		<ul className="flex flex-col gap-4 h-full overflow-y-auto">{children}</ul>
	);
};

export default ProjectChatList;
