"use client";

import {useAction} from "#src/shared/hooks";
import {useModal} from "#src/shared/modal";
import {useToast} from "#src/shared/toast";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FC, FormEvent} from "react";
import {deleteProject} from "./actions";

interface Props {
	projectId: string;
}

const DeleteProjectButton: FC<Props> = ({projectId}) => {
	const router = useRouter();
	const {showToast} = useToast();
	const {closeModal} = useModal();

	const {execute, isPending} = useAction(deleteProject, {
		onSuccess: data => {
			router.refresh();
			showToast({variant: "success", message: data.success});
			closeModal();
		},
		onError: data => {
			showToast({variant: "error", message: data.error});
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
