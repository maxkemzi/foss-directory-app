import {SubmitButton} from "#src/components";
import {RepoFromApi} from "#src/types/api";
import {Button, Input} from "@nextui-org/react";
import {FC, useEffect, useState} from "react";
import {useFormState} from "react-dom";
import ReposField from "./ReposField/ReposField";
import TagsField from "./TagsField/TagsField";
import {createProject} from "./actions";
import {INITIAL_FORM_STATE} from "./constants";

interface Props {
	onSuccess: () => void;
	onClose: () => void;
}

interface FieldValues {
	name: string;
	description: string;
	repoUrl: string;
	tags: string[];
}

const Form: FC<Props> = ({onSuccess, onClose}) => {
	const [state, formAction] = useFormState(createProject, INITIAL_FORM_STATE);
	const [fieldValues, setFieldValues] = useState<FieldValues>({
		name: "",
		description: "",
		repoUrl: "",
		tags: []
	});

	useEffect(() => {
		if (state.success) {
			onSuccess();
		}
	}, [onSuccess, state.success]);

	const handleRepoSelectionChange = (repo?: RepoFromApi) => {
		if (!repo) {
			return;
		}

		setFieldValues({
			name: repo.name,
			description: repo.description,
			repoUrl: repo.url,
			tags: [...repo.topics]
		});
	};

	return (
		<form className="mb-2" action={formAction}>
			<div className="flex flex-col gap-4">
				<ReposField onSelectionChange={handleRepoSelectionChange} />
				<Input
					key={`name-${fieldValues.name}`}
					label="Name"
					placeholder="Enter name"
					name="name"
					isInvalid={Object.hasOwn(state.fieldErrors, "name")}
					errorMessage={state.fieldErrors?.name?.[0]}
					defaultValue={fieldValues.name}
				/>
				<Input
					key={`description-${fieldValues.description}`}
					label="Description"
					placeholder="Enter description"
					name="description"
					isInvalid={Object.hasOwn(state.fieldErrors, "description")}
					errorMessage={state.fieldErrors?.description?.[0]}
					defaultValue={fieldValues.description}
				/>
				<Input
					key={`repoUrl-${fieldValues.repoUrl}`}
					label="Url"
					placeholder="Enter url"
					name="repoUrl"
					isInvalid={Object.hasOwn(state.fieldErrors, "repoUrl")}
					errorMessage={state.fieldErrors?.repoUrl?.[0]}
					defaultValue={fieldValues.repoUrl}
				/>
				<TagsField
					key={`tags-${fieldValues.tags.join()}`}
					isInvalid={Object.hasOwn(state.fieldErrors, "tags")}
					errorMessage={state.fieldErrors?.tags?.[0]}
					defaultValue={fieldValues.tags}
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
