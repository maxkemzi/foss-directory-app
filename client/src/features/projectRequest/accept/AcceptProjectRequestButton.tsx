"use client";

import {ProjectRequestFromApi} from "#src/shared/api";
import {useFormAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {Button} from "@nextui-org/react";
import {FC} from "react";
import {acceptProjectRequest} from "./actions";
import {FormFields} from "./types";

interface Props {
	requestId: ProjectRequestFromApi["id"];
}

const AcceptProjectRequestButton: FC<Props> = ({requestId}) => {
	const {showToast} = useToast();
	const {formAction, isPending} = useFormAction<FormFields>(
		acceptProjectRequest,
		{
			onSuccess: () => {
				showToast({variant: "success", message: "Request has been accepted"});
			},
			onError: () => {
				showToast({variant: "error", message: "Error accepting request"});
			}
		}
	);

	return (
		<form action={formAction}>
			<Button color="success" type="submit" disabled={isPending}>
				Accept
			</Button>
			<input type="hidden" name="projectRequestId" defaultValue={requestId} />
		</form>
	);
};

export default AcceptProjectRequestButton;
