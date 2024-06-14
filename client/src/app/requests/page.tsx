import {projectRequestActions} from "#src/entities/projectRequest";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import List from "./List";

const Requests = async () => {
	const LIMIT = 6;
	const response = await projectRequestActions.getIncoming({
		limit: LIMIT
	});

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Requests</PageTitle>
				<PageContent>
					{response.data.length !== 0 ? (
						<List response={response} />
					) : (
						<p>There are no requests</p>
					)}
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default Requests;
