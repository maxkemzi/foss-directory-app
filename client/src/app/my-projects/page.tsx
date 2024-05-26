import {getMyProjects} from "#src/entities/project";
import Table from "./Table";

const MyProjects = async () => {
	const projects = await getMyProjects();

	return <Table projects={projects} />;
};

export default MyProjects;
