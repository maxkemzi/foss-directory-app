import {requestProjects} from "#src/api";
import {Header} from "../(header)";

const Projects = async () => {
	const projects = await requestProjects();

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
