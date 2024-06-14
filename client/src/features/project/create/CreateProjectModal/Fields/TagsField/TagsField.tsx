"use client";

import {useTagList} from "#src/entities/tag";
import {useDebouncedCallback} from "#src/shared/hooks";
import {PlusIcon} from "@heroicons/react/24/solid";
import {Autocomplete, AutocompleteItem, Button, Chip} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {KeyboardEvent, useEffect, useMemo, useState} from "react";
import {useFormContext} from "react-hook-form";
import {FormValues} from "../../../types";

const TagsField = () => {
	const {formState, ...form} = useFormContext<FormValues>();
	const tagsValue = form.watch("tags");

	const {tags, hasMore, isFetching, fetchFirstPage, fetchMore} = useTagList();

	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);
	const [autocompleteValue, setAutocompleteValue] = useState("");
	const [, scrollerRef] = useInfiniteScroll({
		hasMore,
		isEnabled: autocompleteIsOpen,
		shouldUseLoader: false,
		onLoadMore: () => fetchMore({search: autocompleteValue})
	});

	const fetchFirstPageWithDebounce = useDebouncedCallback(fetchFirstPage);
	useEffect(() => {
		fetchFirstPageWithDebounce({search: autocompleteValue});
	}, [autocompleteValue, fetchFirstPageWithDebounce]);

	const submitIsDisabled = useMemo(
		() =>
			autocompleteValue.length === 0 || tagsValue.includes(autocompleteValue),
		[autocompleteValue, tagsValue]
	);

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
					classNames={{listboxWrapper: "max-h-[100px]"}}
					label="Tags"
					placeholder="Enter tag"
					isLoading={isFetching}
					items={tags}
					allowsCustomValue
					scrollRef={scrollerRef}
					onOpenChange={setAutocompleteIsOpen}
					inputValue={autocompleteValue}
					onInputChange={setAutocompleteValue}
					isInvalid={"tags" in formState.errors}
					errorMessage={formState.errors.tags?.message}
					onKeyDown={handleKeyDown}
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
