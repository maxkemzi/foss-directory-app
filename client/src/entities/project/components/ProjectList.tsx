import {FC, PropsWithChildren} from "react";

const ProjectList: FC<PropsWithChildren> = ({children}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-items-center gap-4">
			{children}
		</div>
	);
};

export default ProjectList;
