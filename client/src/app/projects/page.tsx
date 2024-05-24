import {ProjectCard, getAllProjects} from "#src/entities/project";

const Projects = async () => {
	const projects = await getAllProjects();

	return (
		<div className="grid grid-cols-3 items-start gap-4">
			{projects.map(project => (
				<ProjectCard
					key={project.id}
					requestable={project.requestable}
					project={project}
				/>
			))}
		</div>
	);
};

export default Projects;
