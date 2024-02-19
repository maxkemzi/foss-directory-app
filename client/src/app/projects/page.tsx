import {ProjectsApi} from "#src/api";
import {Header} from "../(header)";

const Projects = async () => {
	const projects = await ProjectsApi.fetchAll();

	return (
		<>
			<Header />
			<main>
				<div>
					{projects.map(project => (
						<div key={project.id}>{project.name}</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Projects;
