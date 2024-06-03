import {getYourProjects} from "#src/entities/project";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import Table from "./Table";

const YourProjects = async () => {
	const projects = await getYourProjects();

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Your projects</PageTitle>
				<PageContent>
					<Table projects={projects} />
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default YourProjects;
