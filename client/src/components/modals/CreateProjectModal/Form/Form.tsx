import {SubmitButton} from "#src/components";
import {Cookie} from "#src/constants";
import {parseClientCookie} from "#src/helpers";
import {RepoFromApi, UserFromApi} from "#src/types";
import {Button, Input} from "@nextui-org/react";
import {FC, useEffect, useState} from "react";
import {useFormState} from "react-dom";
import ReposField from "./ReposField/ReposField";
import TagsField from "./TagsField/TagsField";
import {createProject} from "./actions";
import {INITIAL_FIELD_VALUES, INITIAL_FORM_STATE} from "./constants";

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
	const [fieldValues, setFieldValues] =
		useState<FieldValues>(INITIAL_FIELD_VALUES);

	const user = parseClientCookie<UserFromApi>(Cookie.USER);

	useEffect(() => {
		if (state.success) {
			onSuccess();
		}
	}, [onSuccess, state.success]);

	const handleRepoSelectionChange = (repo?: RepoFromApi) => {
		if (!repo) {
			setFieldValues(INITIAL_FIELD_VALUES);
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
				{user?.githubIsConnected ? (
					<ReposField onSelectionChange={handleRepoSelectionChange} />
				) : null}

				<div key={`name-${fieldValues.name}`}>
					<Input
						label="Name"
						placeholder="Enter name"
						name="name"
						isInvalid={Object.hasOwn(state.fieldErrors, "name")}
						errorMessage={state.fieldErrors?.name?.[0]}
						defaultValue={fieldValues.name}
					/>
				</div>
				<div key={`description-${fieldValues.description}`}>
					<Input
						label="Description"
						placeholder="Enter description"
						name="description"
						isInvalid={Object.hasOwn(state.fieldErrors, "description")}
						errorMessage={state.fieldErrors?.description?.[0]}
						defaultValue={fieldValues.description}
					/>
				</div>
				<div key={`repoUrl-${fieldValues.repoUrl}`}>
					<Input
						label="Url"
						placeholder="Enter url"
						name="repoUrl"
						isInvalid={Object.hasOwn(state.fieldErrors, "repoUrl")}
						errorMessage={state.fieldErrors?.repoUrl?.[0]}
						defaultValue={fieldValues.repoUrl}
					/>
				</div>

				<div key={`tags-${fieldValues.tags.join()}`}>
					<TagsField
						isInvalid={Object.hasOwn(state.fieldErrors, "tags")}
						errorMessage={state.fieldErrors?.tags?.[0]}
						defaultValue={fieldValues.tags}
					/>
				</div>
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
