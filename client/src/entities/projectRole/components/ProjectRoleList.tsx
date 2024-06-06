import {FC, PropsWithChildren} from "react";

const ProjectRoleList: FC<PropsWithChildren> = ({children}) => {
	return <ul className="flex gap-x-2 overflow-x-auto">{children}</ul>;
};

export default ProjectRoleList;
