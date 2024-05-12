"use client";

import {useSession} from "#src/providers";
import {RepoFromApi} from "#src/types/apis";
import {Input} from "@nextui-org/react";
import {FC, useState} from "react";
import ReposField from "./ReposField/ReposField";
import RolesField from "./RolesField/RolesField";
import TagsField from "./TagsField/TagsField";
import {FormState, INITIAL_FIELD_VALUES} from "./constants";

interface Props {
	state: FormState;
}

interface FieldValues {
	name: string;
	description: string;
	repoUrl: string;
	role: string;
	tags: string[];
	roles: {[role: string]: number};
}

const FormFields: FC<Props> = ({state}) => {
	const session = useSession();
	const [fieldValues, setFieldValues] =
		useState<FieldValues>(INITIAL_FIELD_VALUES);

	const handleRepoSelectionChange = (repo?: RepoFromApi) => {
		if (!repo) {
			setFieldValues(INITIAL_FIELD_VALUES);
			return;
		}

		setFieldValues(prev => ({
			...prev,
			name: repo.name,
			description: repo.description,
			repoUrl: repo.url,
			tags: [...repo.topics]
		}));
	};

	console.log(state);

	return (
		<div className="flex flex-col gap-4">
			{session && session.user.githubIsConnected ? (
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
			<div key={`role-${fieldValues.role}`}>
				<Input
					label="Role"
					placeholder="Enter your role"
					name="role"
					isInvalid={Object.hasOwn(state.fieldErrors, "role")}
					errorMessage={state.fieldErrors?.role?.[0]}
					defaultValue={fieldValues.role}
				/>
			</div>
			<div key={`tags-${fieldValues.tags.join()}`}>
				<TagsField
					isInvalid={Object.hasOwn(state.fieldErrors, "tags")}
					errorMessage={state.fieldErrors?.tags?.[0]}
					defaultValue={fieldValues.tags}
				/>
			</div>
			<div key={`roles-${Object.keys(fieldValues.roles).join()}`}>
				<RolesField
					isInvalid={Object.hasOwn(state.fieldErrors, "roles")}
					errorMessage={state.fieldErrors?.roles?.[0]}
					defaultValue={fieldValues.roles}
				/>
			</div>
		</div>
	);
};

export default FormFields;
