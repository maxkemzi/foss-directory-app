import {fetchAllProjects} from "#src/apis/projects";
import {ProjectCard} from "#src/components";
import {Container} from "#src/components/ui";
import {Header} from "../(header)";

const Projects = async () => {
	const projects = await fetchAllProjects();

	return (
		<>
			<Header />
			<main>
				<section className="py-6">
					<Container>
						<div className="grid grid-cols-3 items-start gap-4">
							{projects.map(project => (
								<ProjectCard
									key={project.id}
									requestable={project.requestable}
									project={project}
								/>
							))}
						</div>
					</Container>
				</section>
			</main>
		</>
	);
};

export default Projects;
