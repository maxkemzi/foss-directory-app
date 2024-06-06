import {ProjectRequestFromApi} from "#src/shared/api";
import {Button} from "@nextui-org/react";
import {FC} from "react";
import {acceptProjectRequest} from "./actions";

interface Props {
	requestId: ProjectRequestFromApi["id"];
}

const AcceptProjectRequestButton: FC<Props> = ({requestId}) => {
	const acceptActionWithId = acceptProjectRequest.bind(null, requestId);

	return (
		<form action={acceptActionWithId}>
			<Button color="success" type="submit">
				Accept
			</Button>
		</form>
	);
};

export default AcceptProjectRequestButton;
