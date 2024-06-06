"use client";

import {SubmitButton} from "#src/shared/ui";
import {FC} from "react";

interface Props {
	projectId: string;
	action: (formData: FormData) => void;
}

const DeleteProjectButton: FC<Props> = ({action, projectId}) => {
	return (
		<form action={action}>
			<SubmitButton color="danger">Delete</SubmitButton>
			<input type="hidden" name="projectId" defaultValue={projectId} />
		</form>
	);
};

export default DeleteProjectButton;
