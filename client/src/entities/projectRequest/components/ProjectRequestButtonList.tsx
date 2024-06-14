import {FC, PropsWithChildren} from "react";

const ProjectRequestButtonList: FC<PropsWithChildren> = ({children}) => {
	return <div className="flex sm:flex-col gap-2">{children}</div>;
};

export default ProjectRequestButtonList;
