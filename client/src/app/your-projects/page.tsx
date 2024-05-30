import {getYourProjects} from "#src/entities/project";
import Table from "./Table";

const YourProjects = async () => {
	const projects = await getYourProjects();

	return <Table projects={projects} />;
};

export default YourProjects;
