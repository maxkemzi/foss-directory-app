import {ProjectList, getAllProjects} from "#src/entities/project";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import {ProjectCard} from "#src/widgets/ProjectCard";

const Projects = async () => {
	const {data: projects} = await getAllProjects();

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Projects</PageTitle>
				<PageContent>
					{projects.length !== 0 ? (
						<ProjectList>
							{projects.map(p => (
								<ProjectCard key={p.id} project={p} />
							))}
						</ProjectList>
					) : (
						<p>There are no projects</p>
					)}
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default Projects;
