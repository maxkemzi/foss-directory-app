import {ProjectCard, getAllProjects} from "#src/entities/project";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";

const Projects = async () => {
	const projects = await getAllProjects();

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Projects</PageTitle>
				<PageContent>
					{projects.length !== 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-items-center gap-4">
							{projects.map(project => (
								<ProjectCard
									key={project.id}
									requestable={project.requestable}
									project={project}
								/>
							))}
						</div>
					) : (
						<p>There are no projects</p>
					)}
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default Projects;
