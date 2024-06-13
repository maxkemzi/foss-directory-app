"use client";

import {useSafeAction} from "#src/shared/hooks";
import {useModal} from "#src/shared/modal";
import {useToast} from "#src/shared/toast";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FC, FormEvent} from "react";
import {safeDeleteProjectById} from "./actions";

interface Props {
	projectId: string;
}

const DeleteProjectButton: FC<Props> = ({projectId}) => {
	const router = useRouter();
	const {showToast} = useToast();
	const {closeModal} = useModal();

	const {execute, isPending} = useSafeAction(safeDeleteProjectById, {
		onSuccess: result => {
			router.refresh();
			showToast({variant: "success", message: result.success});
			closeModal();
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		execute(projectId);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Button color="danger" isDisabled={isPending} type="submit">
				Delete
			</Button>
		</form>
	);
};

export default DeleteProjectButton;
