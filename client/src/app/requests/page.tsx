import {
	ProjectRequestCard,
	acceptProjectRequest,
	getProjectRequestsSentToMe,
	rejectProjectRequest
} from "#src/entities/projectRequest";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";

const Requests = async () => {
	const requests = await getProjectRequestsSentToMe();

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Requests</PageTitle>
				<PageContent>
					{requests.length !== 0 ? (
						<div className="flex flex-col items-start gap-4">
							{requests.map(request => {
								return (
									<ProjectRequestCard
										key={request.id}
										request={request}
										acceptAction={acceptProjectRequest}
										rejectAction={rejectProjectRequest}
									/>
								);
							})}
						</div>
					) : (
						<p>There are no requests</p>
					)}
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default Requests;
