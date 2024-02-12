"use client";

import {Tag} from "#src/api";
import {SubmitButton} from "#src/components";
import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Chip,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {FC, useEffect, useState} from "react";
import {useFormState} from "react-dom";
import {CustomModalProps} from "../types";
import {createProject, getTags} from "./actions";
import {INITIAL_FORM_STATE} from "./constants";

// TODO: split code into separate components
const CreateProjectModal: FC<CustomModalProps> = ({isOpen, onClose}) => {
	const [state, formAction] = useFormState(createProject, INITIAL_FORM_STATE);

	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);

	const [tags, setTags] = useState<Tag[]>([]);
	const [tagsAreFetching, setTagsAreFetching] = useState(false);

	const [tagValues, setTagValues] = useState<string[]>([]);
	const [tagValue, setTagValue] = useState<string>("");

	const [, scrollerRef] = useInfiniteScroll({
		hasMore: false,
		isEnabled: autocompleteIsOpen,
		onLoadMore: () => {}
	});

	useEffect(() => {
		const fetchTags = async () => {
			setTagsAreFetching(true);
			setTags(await getTags());
			setTagsAreFetching(false);
		};
		fetchTags();
	}, []);

	const addTagValue = () => {
		setTagValues(prev => [...prev, tagValue]);
		setTagValue("");
	};
	const removeTagValue = (value: string) =>
		setTagValues(prev => prev.filter(tv => tv !== value));

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				{handleClose => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Project Creation
						</ModalHeader>
						<form className="mb-2" action={formAction}>
							<ModalBody>
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
									<div>
										<div className="flex gap-4">
											<Autocomplete
												label="Tags"
												placeholder="Enter tag"
												isLoading={tagsAreFetching}
												defaultItems={tags}
												allowsCustomValue
												scrollRef={scrollerRef}
												onOpenChange={setAutocompleteIsOpen}
												inputValue={tagValue}
												onInputChange={setTagValue}
												isInvalid={Object.hasOwn(state.fieldErrors, "tags")}
												errorMessage={state.fieldErrors?.tags?.[0]}
											>
												{item => (
													<AutocompleteItem key={item.id}>
														{item.name}
													</AutocompleteItem>
												)}
											</Autocomplete>
											<Button
												className="h-auto"
												onClick={addTagValue}
												isDisabled={
													tagValue.length === 0 || tagValues.includes(tagValue)
												}
												color="primary"
											>
												Add
											</Button>
										</div>
										{tagValues.length !== 0 ? (
											<div className="flex gap-4 mt-4">
												{tagValues.map(tv => (
													<Chip
														key={tv}
														onClose={() => removeTagValue(tv)}
														variant="flat"
													>
														{tv}
													</Chip>
												))}
											</div>
										) : null}
									</div>
									<input
										type="hidden"
										name="tags"
										value={JSON.stringify(tagValues)}
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button variant="light" onPress={handleClose}>
									Cancel
								</Button>
								<SubmitButton>Create</SubmitButton>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CreateProjectModal;
