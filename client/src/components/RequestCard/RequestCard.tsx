import {ProjectRequestFromApi} from "#src/types/apis";
import {Avatar, Button, Card, CardBody} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	request: ProjectRequestFromApi;
	acceptAction: (id: string, formData: FormData) => void;
	rejectAction: (id: string, formData: FormData) => void;
}

const RequestCard: FC<Props> = ({request, acceptAction, rejectAction}) => {
	const acceptActionWithId = acceptAction.bind(null, request.id);
	const rejectActionWithId = rejectAction.bind(null, request.id);

	return (
		<Card className="max-w-[400px]">
			<CardBody>
				<div className="flex gap-4">
					<Avatar
						size="lg"
						isBordered
						as="button"
						className="transition-transform"
						color="secondary"
						name={request.requester.username}
					/>
					<div className="flex flex-col gap-2">
						<div>
							<p className="font-semibold">{request.requester.username}</p>
							<p>Project: {request.project.name}</p>
							<p>Role: {request.role.name} </p>
						</div>
						<div className="flex gap-2">
							<form action={acceptActionWithId}>
								<Button color="success" type="submit">
									Accept
								</Button>
							</form>
							<form action={rejectActionWithId}>
								<Button color="danger" type="submit">
									Reject
								</Button>
							</form>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default RequestCard;
