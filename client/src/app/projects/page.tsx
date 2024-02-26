import {ProjectsApi} from "#src/api";
import {ProjectCard} from "#src/components";
import {Container} from "#src/components/ui";
import {Header} from "../(header)";

const Projects = async () => {
	const projects = await ProjectsApi.fetchAll();

	return (
		<>
			<Header />
			<main>
				<section>
					<Container>
						<div className="grid grid-cols-3 gap-4">
							{projects.map(project => (
								<ProjectCard key={project.id} project={project} />
							))}
						</div>
					</Container>
				</section>
			</main>
		</>
	);
};

export default Projects;
