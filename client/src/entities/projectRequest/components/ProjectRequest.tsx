import {ProjectRequestFromApi} from "#src/shared/apis";
import {Avatar, Card, CardBody} from "@nextui-org/react";
import {FC, ReactNode} from "react";

interface Props {
	request: ProjectRequestFromApi;
	endSlot?: ReactNode;
}

const ProjectRequest: FC<Props> = ({request, endSlot}) => {
	return (
		<Card
			classNames={{
				base: "max-sm:w-[250px] sm:w-[450px]",
				body: "w-full"
			}}
		>
			<CardBody>
				<div className="w-full flex gap-6 max-sm:flex-col">
					<div className="w-full overflow-hidden flex flex-grow sm:items-center justify-start gap-4 max-sm:flex-col">
						<Avatar
							size="lg"
							isBordered
							as="button"
							className="transition-transform flex-shrink-0 m-1"
							color="secondary"
							name={request.user.username}
						/>
						<div className="flex flex-grow flex-col overflow-x-auto whitespace-nowrap">
							<p className="font-semibold">{request.user.username}</p>
							<p>Project: {request.project.name}</p>
							<p>Role: {request.role.name} </p>
						</div>
					</div>
					{endSlot ? <div className="flex-shrink-0">{endSlot}</div> : null}
				</div>
			</CardBody>
		</Card>
	);
};

export default ProjectRequest;
