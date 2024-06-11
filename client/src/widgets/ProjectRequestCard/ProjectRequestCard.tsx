import {
	ProjectRequest,
	ProjectRequestButtonList
} from "#src/entities/projectRequest";
import {AcceptProjectRequestButton} from "#src/features/projectRequest/accept";
import {RejectProjectRequestButton} from "#src/features/projectRequest/reject";
import {ProjectRequestFromApi} from "#src/shared/apis";
import {FC} from "react";

interface Props {
	request: ProjectRequestFromApi;
}

const ProjectRequestCard: FC<Props> = ({request}) => {
	return (
		<ProjectRequest
			request={request}
			bottomSlot={
				<ProjectRequestButtonList>
					<AcceptProjectRequestButton requestId={request.id} />
					<RejectProjectRequestButton requestId={request.id} />
				</ProjectRequestButtonList>
			}
		/>
	);
};

export default ProjectRequestCard;
