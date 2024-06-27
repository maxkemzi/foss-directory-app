import {projectActions} from "#src/entities/project";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import Table from "./Table";

const LIMIT = 6;

const YourProjects = async () => {
	const response = await projectActions.getByVariant("owner", {
		limit: LIMIT
	});

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Your projects</PageTitle>
				<PageContent>
					<Table response={response} />
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default YourProjects;
