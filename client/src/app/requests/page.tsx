import {
	ProjectRequestList,
	getReceivedProjectRequests
} from "#src/entities/projectRequest";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import {ProjectRequestCard} from "#src/widgets/ProjectRequestCard";

const Requests = async () => {
	const requests = await getReceivedProjectRequests();

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Requests</PageTitle>
				<PageContent>
					{requests.length !== 0 ? (
						<ProjectRequestList>
							{requests.map(r => {
								return <ProjectRequestCard key={r.id} request={r} />;
							})}
						</ProjectRequestList>
					) : (
						<p>There are no requests</p>
					)}
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default Requests;
