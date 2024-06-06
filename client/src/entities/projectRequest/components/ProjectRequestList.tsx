import {FC, PropsWithChildren} from "react";

const ProjectRequestList: FC<PropsWithChildren> = ({children}) => {
	return <div className="flex flex-col items-start gap-4">{children}</div>;
};

export default ProjectRequestList;
