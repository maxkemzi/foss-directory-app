"use client";

import {ProjectRequestFromApi} from "#src/shared/api";
import {useFormAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {Button} from "@nextui-org/react";
import {FC} from "react";
import {rejectProjectRequest} from "./actions";

interface Props {
	requestId: ProjectRequestFromApi["id"];
}

const RejectProjectRequestButton: FC<Props> = ({requestId}) => {
	const {showToast} = useToast();
	const {formAction, isPending} = useFormAction(rejectProjectRequest, {
		onSuccess: () => {
			showToast({variant: "success", message: "Request has been rejected"});
		},
		onError: () => {
			showToast({variant: "error", message: "Error rejecting request"});
		}
	});

	return (
		<form action={formAction}>
			<Button color="danger" type="submit" disabled={isPending}>
				Reject
			</Button>
			<input type="hidden" name="projectRequestId" defaultValue={requestId} />
		</form>
	);
};

export default RejectProjectRequestButton;
