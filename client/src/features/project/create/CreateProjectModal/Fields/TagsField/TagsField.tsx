"use client";

import {useTagList} from "#src/entities/tag";
import {useDebouncedCallback, useObserver} from "#src/shared/hooks";
import {PlusIcon} from "@heroicons/react/24/solid";
import {Autocomplete, AutocompleteItem, Button, Chip} from "@nextui-org/react";
import {KeyboardEvent, useEffect, useMemo, useRef, useState} from "react";
import {useFormContext} from "react-hook-form";
import {FormValues} from "../../../types";

const TagsField = () => {
	const {formState, ...form} = useFormContext<FormValues>();
	const tagsValue = form.watch("tags");

	const {tags, hasMore, isFetching, fetchFirstPage, fetchMore} = useTagList();

	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);
	const [autocompleteValue, setAutocompleteValue] = useState("");

	const rootRef = useRef(null);
	const targetRef = useRef(null);
	useObserver(targetRef, {
		hasMore,
		isEnabled: autocompleteIsOpen && !isFetching,
		rootRef,
		rootMargin: "0px 0px 75px 0px",
		onIntersect: () => fetchMore({search: autocompleteValue})
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
					label="Tags"
					placeholder="Enter tag"
					isLoading={isFetching}
					items={tags}
					allowsCustomValue
					scrollRef={rootRef}
					onOpenChange={setAutocompleteIsOpen}
					inputValue={autocompleteValue}
					onInputChange={setAutocompleteValue}
					isInvalid={"tags" in formState.errors}
					errorMessage={formState.errors.tags?.message}
					onKeyDown={handleKeyDown}
				>
					{item => {
						if (item.id === tags[tags.length - 1].id) {
							return (
								<AutocompleteItem key={item.id}>
									{item.name}
									<div ref={targetRef} className="invisible" />
								</AutocompleteItem>
							);
						}

						return (
							<AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
						);
					}}
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
