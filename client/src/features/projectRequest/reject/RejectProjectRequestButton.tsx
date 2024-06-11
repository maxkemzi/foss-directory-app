"use client";

import {ProjectRequestFromApi} from "#src/shared/apis";
import {useAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {Button} from "@nextui-org/react";
import {FC, FormEvent} from "react";
import {rejectProjectRequestById} from "./actions";

interface Props {
	requestId: ProjectRequestFromApi["id"];
}

const RejectProjectRequestButton: FC<Props> = ({requestId}) => {
	const {showToast} = useToast();
	const {execute, isPending} = useAction(rejectProjectRequestById, {
		onSuccess: data => {
			showToast({variant: "success", message: data.success});
		},
		onError: data => {
			showToast({variant: "error", message: data.error});
		}
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		execute(requestId);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Button color="danger" isDisabled={isPending} type="submit">
				Reject
			</Button>
		</form>
	);
};

export default RejectProjectRequestButton;
