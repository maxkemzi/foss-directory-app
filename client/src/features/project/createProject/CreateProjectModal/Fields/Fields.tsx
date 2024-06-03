"use client";

import {RepoFromApi} from "#src/shared/api";
import {useSession} from "#src/shared/auth";
import {FieldErrors} from "#src/shared/hooks";
import {Input} from "@nextui-org/react";
import {FC, KeyboardEvent, RefObject, useState} from "react";
import {INITIAL_FIELD_VALUES} from "../../constants";
import {FormFields} from "../../types";
import ReposField from "./ReposField/ReposField";
import RolesField from "./RolesField/RolesField";
import TagsField from "./TagsField/TagsField";

interface Props {
	fieldErrors: FieldErrors<FormFields>;
	formRef: RefObject<HTMLFormElement>;
}

const Fields: FC<Props> = ({fieldErrors, formRef}) => {
	const session = useSession();
	const [fieldValues, setFieldValues] =
		useState<FormFields>(INITIAL_FIELD_VALUES);

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

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			formRef.current?.requestSubmit();
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{session && session.user.githubIsConnected ? (
				<ReposField
					onKeyDown={handleKeyDown}
					onSelectionChange={handleRepoSelectionChange}
				/>
			) : null}

			<div key={`name-${fieldValues.name}`}>
				<Input
					label="Name"
					placeholder="Enter name"
					name="name"
					isInvalid={"name" in fieldErrors}
					errorMessage={fieldErrors?.name?.[0]}
					defaultValue={fieldValues.name}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div key={`description-${fieldValues.description}`}>
				<Input
					label="Description"
					placeholder="Enter description"
					name="description"
					isInvalid={"description" in fieldErrors}
					errorMessage={fieldErrors?.description?.[0]}
					defaultValue={fieldValues.description}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div key={`repoUrl-${fieldValues.repoUrl}`}>
				<Input
					label="Url"
					placeholder="Enter url"
					name="repoUrl"
					isInvalid={"repoUrl" in fieldErrors}
					errorMessage={fieldErrors?.repoUrl?.[0]}
					defaultValue={fieldValues.repoUrl}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div key={`role-${fieldValues.role}`}>
				<Input
					label="Role"
					placeholder="Enter your role"
					name="role"
					isInvalid={"role" in fieldErrors}
					errorMessage={fieldErrors?.role?.[0]}
					defaultValue={fieldValues.role}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div key={`tags-${fieldValues.tags.join()}`}>
				<TagsField
					isInvalid={"tags" in fieldErrors}
					errorMessage={fieldErrors?.tags?.[0]}
					defaultValue={fieldValues.tags}
					formRef={formRef}
				/>
			</div>
			<div key={`roles-${Object.keys(fieldValues.roles).join()}`}>
				<RolesField
					isInvalid={"roles" in fieldErrors}
					errorMessage={fieldErrors?.roles?.[0]}
					defaultValue={fieldValues.roles}
					formRef={formRef}
				/>
			</div>
		</div>
	);
};

Fields.displayName = "FormFields";

export default Fields;
