import {SubmitButton} from "#src/components";
import {Button, Input} from "@nextui-org/react";
import {FC, useEffect} from "react";
import {useFormState} from "react-dom";
import FormTagsField from "../FormTagsField/FormTagsField";
import {createProject} from "./actions";
import {INITIAL_FORM_STATE} from "./constants";

interface Props {
	onClose: () => void;
}

const Form: FC<Props> = ({onClose}) => {
	const [state, formAction] = useFormState(createProject, INITIAL_FORM_STATE);

	useEffect(() => {
		if (state.success) {
			onClose();
		}
	}, [onClose, state.success]);

	return (
		<form className="mb-2" action={formAction}>
			<div className="flex flex-col gap-4">
				<Input
					label="Name"
					placeholder="Enter name"
					name="name"
					isInvalid={Object.hasOwn(state.fieldErrors, "name")}
					errorMessage={state.fieldErrors?.name?.[0]}
				/>
				<Input
					label="Description"
					placeholder="Enter description"
					name="description"
					isInvalid={Object.hasOwn(state.fieldErrors, "description")}
					errorMessage={state.fieldErrors?.description?.[0]}
				/>
				<Input
					label="Url"
					placeholder="Enter url"
					name="repoUrl"
					isInvalid={Object.hasOwn(state.fieldErrors, "repoUrl")}
					errorMessage={state.fieldErrors?.repoUrl?.[0]}
				/>
				<FormTagsField
					isInvalid={Object.hasOwn(state.fieldErrors, "tags")}
					errorMessage={state.fieldErrors?.tags?.[0]}
				/>
			</div>
			<div className="flex gap-2 justify-end mt-6">
				<Button variant="light" onPress={onClose}>
					Close
				</Button>
				<SubmitButton>Create</SubmitButton>
			</div>
		</form>
	);
};

export default Form;
