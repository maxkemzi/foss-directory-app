"use client";

import {ProjectRequestFromApi} from "#src/shared/apis";
import {useSafeAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {Button} from "@nextui-org/react";
import {FC, FormEvent} from "react";
import {safeRejectProjectRequestById} from "./actions";

interface Props {
	requestId: ProjectRequestFromApi["id"];
}

const RejectProjectRequestButton: FC<Props> = ({requestId}) => {
	const {showToast} = useToast();
	const {execute, isPending} = useSafeAction(safeRejectProjectRequestById, {
		onSuccess: result => {
			showToast({variant: "success", message: result.success});
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
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
