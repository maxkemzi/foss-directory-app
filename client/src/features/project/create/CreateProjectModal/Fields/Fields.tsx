"use client";

import {useSession} from "#src/shared/auth";
import {Input} from "@nextui-org/react";
import {FC, KeyboardEvent} from "react";
import {Controller, SubmitHandler, useFormContext} from "react-hook-form";
import {FormValues} from "../../types";
import ReposField from "./ReposField/ReposField";
import RolesField from "./RolesField/RolesField";
import TagsField from "./TagsField/TagsField";

interface Props {
	onSubmit: SubmitHandler<FormValues>;
}

const Fields: FC<Props> = ({onSubmit}) => {
	const session = useSession();

	const {formState, ...form} = useFormContext<FormValues>();

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			form.handleSubmit(onSubmit)();
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{session && session.user.githubIsConnected ? (
				<ReposField onKeyDown={handleKeyDown} />
			) : null}

			<Controller
				control={form.control}
				name="name"
				render={({field}) => (
					<Input
						{...field}
						label="Name"
						placeholder="Enter name"
						isInvalid={"name" in formState.errors}
						errorMessage={formState.errors.name?.message}
						onKeyDown={handleKeyDown}
					/>
				)}
			/>

			<Controller
				control={form.control}
				name="description"
				render={({field}) => (
					<Input
						{...field}
						label="Description"
						placeholder="Enter description"
						isInvalid={"description" in formState.errors}
						errorMessage={formState.errors.description?.message}
						onKeyDown={handleKeyDown}
					/>
				)}
			/>

			<Controller
				control={form.control}
				name="repoUrl"
				render={({field}) => (
					<Input
						{...field}
						label="Url"
						placeholder="Enter url"
						isInvalid={"repoUrl" in formState.errors}
						errorMessage={formState.errors.repoUrl?.message}
						onKeyDown={handleKeyDown}
					/>
				)}
			/>

			<Controller
				control={form.control}
				name="role"
				render={({field}) => (
					<Input
						{...field}
						label="Role"
						placeholder="Enter your role"
						isInvalid={"role" in formState.errors}
						errorMessage={formState.errors.role?.message}
						onKeyDown={handleKeyDown}
					/>
				)}
			/>

			<TagsField />

			<RolesField />
		</div>
	);
};

Fields.displayName = "FormFields";

export default Fields;
