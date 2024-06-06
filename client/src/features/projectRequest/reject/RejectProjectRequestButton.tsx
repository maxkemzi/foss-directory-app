import {ProjectRequestFromApi} from "#src/shared/api";
import {Button} from "@nextui-org/react";
import {FC} from "react";
import {rejectProjectRequest} from "./actions";

interface Props {
	requestId: ProjectRequestFromApi["id"];
}

const RejectProjectRequestButton: FC<Props> = ({requestId}) => {
	const rejectActionWithId = rejectProjectRequest.bind(null, requestId);

	return (
		<form action={rejectActionWithId}>
			<Button color="danger" type="submit">
				Reject
			</Button>
		</form>
	);
};

export default RejectProjectRequestButton;
