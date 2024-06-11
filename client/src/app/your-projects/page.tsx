import {getProjectsByOwnership} from "#src/entities/project";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import Table from "./Table";

const YourProjects = async () => {
	const {data: projects} = await getProjectsByOwnership();

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
