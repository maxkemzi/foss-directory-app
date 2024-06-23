import {projectActions} from "#src/entities/project";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import Content from "./Content";

const Projects = async () => {
	const LIMIT = 6;
	const response = await projectActions.getByVariant("all", {limit: LIMIT});

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Projects</PageTitle>
				<PageContent>
					<Content serverResponse={response} />
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default Projects;
