import {ProjectRequestsApi} from "#src/apis";
import {RequestCard} from "#src/components";
import {Container} from "#src/components/ui";
import {Header} from "../(header)";
import {acceptRequest, rejectRequest} from "./actions";

const Requests = async () => {
	const requests = await ProjectRequestsApi.fetchAll();

	console.log(JSON.stringify(requests));

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
										acceptAction={acceptRequest}
										rejectAction={rejectRequest}
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
