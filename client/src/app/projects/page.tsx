import {projectActions} from "#src/entities/project";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import List from "./List";

const Projects = async () => {
	const LIMIT = 6;
	const response = await projectActions.getByVariant("all", {limit: LIMIT});

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Projects</PageTitle>
				<PageContent>
					{response.data.length !== 0 ? (
						<List response={response} />
					) : (
						<p>There are no projects</p>
					)}
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default Projects;
