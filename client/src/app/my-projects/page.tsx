import {ProjectCard, getMyProjects} from "#src/entities/project";

const MyProjects = async () => {
	const projects = await getMyProjects();

	return (
		<div className="grid grid-cols-3 items-start gap-4">
			{projects.map(project => (
				<ProjectCard
					key={project.id}
					project={project}
					requestable={project.requestable}
				/>
			))}
		</div>
	);
};

export default MyProjects;
