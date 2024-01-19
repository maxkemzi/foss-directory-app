import {requestProjects} from "#src/api";
import {Header} from "../(header)";

const fetchProjects = async () => {
	const {data} = await requestProjects();
	return data;
};

const Projects = async () => {
	const projects = await fetchProjects();

	return (
		<>
			<Header />
			<main>
				<div>
					{projects.map(project => (
						<div key={project.id}>{project.title}</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Projects;
