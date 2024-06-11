import {ProjectRequestFromApi} from "#src/shared/apis";
import {Avatar, Card, CardBody} from "@nextui-org/react";
import {FC, ReactNode} from "react";

interface Props {
	request: ProjectRequestFromApi;
	bottomSlot?: ReactNode;
}

const ProjectRequest: FC<Props> = ({request, bottomSlot}) => {
	return (
		<Card className="max-w-[400px]">
			<CardBody>
				<div className="flex max-md:flex-col gap-4">
					<Avatar
						size="lg"
						isBordered
						as="button"
						className="transition-transform"
						color="secondary"
						name={request.user.username}
					/>
					<div className="flex flex-col gap-2">
						<div>
							<p className="font-semibold">{request.user.username}</p>
							<p>Project: {request.project.name}</p>
							<p>Role: {request.role.name} </p>
						</div>
						{bottomSlot}
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default ProjectRequest;
