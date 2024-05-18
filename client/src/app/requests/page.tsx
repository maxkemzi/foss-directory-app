import {fetchProjectRequestsSentToMe} from "#src/apis/projects/requests";
import {RequestCard} from "#src/components";
import {Container} from "#src/components/ui";
import {Header} from "../(header)";
import {acceptProjectRequest, rejectProjectRequest} from "./actions";

const Requests = async () => {
	const requests = await fetchProjectRequestsSentToMe();

	return (
		<>
			<Header />
			<main>
				<section className="py-6">
					<Container>
						<h1 className="text-5xl mb-6">Requests</h1>
						<div className="flex flex-col items-start gap-4">
							{requests.map(request => {
								return (
									<RequestCard
										key={request.id}
										request={request}
										acceptAction={acceptProjectRequest}
										rejectAction={rejectProjectRequest}
									/>
								);
							})}
						</div>
					</Container>
				</section>
			</main>
		</>
	);
};

export default Requests;
