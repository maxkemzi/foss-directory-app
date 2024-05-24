import {
	ProjectRequestCard,
	acceptProjectRequest,
	getProjectRequestsSentToMe,
	rejectProjectRequest
} from "#src/entities/projectRequest";

const Requests = async () => {
	const requests = await getProjectRequestsSentToMe();

	return (
		<>
			<h1 className="text-5xl mb-6">Requests</h1>
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
		</>
	);
};

export default Requests;
