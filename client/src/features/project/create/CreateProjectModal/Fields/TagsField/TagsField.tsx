"use client";

import {TagFromApi} from "#src/shared/api";
import {useAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {PlusIcon} from "@heroicons/react/24/solid";
import {Autocomplete, AutocompleteItem, Button, Chip} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {KeyboardEvent, useEffect, useMemo, useState} from "react";
import {useFormContext} from "react-hook-form";
import {getAllTags} from "../../../actions";
import {FormValues} from "../../../types";

const TagsField = () => {
	const {showToast} = useToast();

	const {formState, ...form} = useFormContext<FormValues>();
	const tagsValue = form.watch("tags");

	const [tags, setTags] = useState<TagFromApi[]>([]);
	const {execute, isPending} = useAction(getAllTags, {
		onSuccess: data => {
			setTags(data.tags);
		},
		onError: data => {
			showToast({variant: "error", message: data.error});
		}
	});

	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);
	const [autocompleteValue, setAutocompleteValue] = useState("");
	// todo: implement infinite scroll
	const [, scrollRef] = useInfiniteScroll({
		hasMore: false,
		isEnabled: autocompleteIsOpen,
		onLoadMore: () => {}
	});

	const submitIsDisabled = useMemo(
		() =>
			autocompleteValue.length === 0 || tagsValue.includes(autocompleteValue),
		[autocompleteValue, tagsValue]
	);

	useEffect(() => {
		execute();
	}, [execute]);

	const addTag = () => {
		const updatedTags = [...tagsValue, autocompleteValue];
		form.setValue("tags", updatedTags, {shouldValidate: true});
		setAutocompleteValue("");
	};

	const removeTag = (tag: string) => {
		const updatedTags = tagsValue.filter(t => t !== tag);
		form.setValue("tags", updatedTags, {shouldValidate: true});
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();

			if (!submitIsDisabled) {
				addTag();
			}
		}
	};

	return (
		<div>
			<div className="flex items-start gap-4">
				<Autocomplete
					label="Tags"
					placeholder="Enter tag"
					isLoading={isPending}
					defaultItems={tags}
					allowsCustomValue
					scrollRef={scrollRef}
					onOpenChange={setAutocompleteIsOpen}
					inputValue={autocompleteValue}
					onInputChange={setAutocompleteValue}
					isInvalid={"tags" in formState.errors}
					errorMessage={formState.errors.tags?.message}
					onKeyDown={handleKeyDown}
					// The following prop fixes the bug in nextui library
					// https://github.com/nextui-org/nextui/issues/2554
					allowsEmptyCollection={false}
					//
				>
					{item => (
						<AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
					)}
				</Autocomplete>
				<Button
					isIconOnly
					onClick={addTag}
					isDisabled={submitIsDisabled}
					color="primary"
				>
					<PlusIcon className="w-[24px] h-[24px]" />
				</Button>
			</div>
			{tagsValue.length !== 0 ? (
				<div className="flex gap-4 mt-2 overflow-x-auto">
					{tagsValue.map(tag => (
						<Chip key={tag} onClose={() => removeTag(tag)} variant="flat">
							{tag}
						</Chip>
					))}
				</div>
			) : null}
		</div>
	);
};

export default TagsField;
