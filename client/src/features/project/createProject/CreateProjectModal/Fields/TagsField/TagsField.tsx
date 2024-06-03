"use client";

import {useToast} from "#src/shared/toast";
import {TagFromApi} from "#src/shared/api";
import {PlusIcon} from "@heroicons/react/24/solid";
import {Autocomplete, AutocompleteItem, Button, Chip} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {
	FC,
	KeyboardEvent,
	RefObject,
	useEffect,
	useMemo,
	useState
} from "react";
import {getAllTags} from "../../../actions";

interface Props {
	isInvalid: boolean;
	formRef: RefObject<HTMLFormElement>;
	errorMessage?: string;
	defaultValue?: string[];
}

const TagsField: FC<Props> = ({
	isInvalid,
	formRef,
	errorMessage,
	defaultValue
}) => {
	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);

	const [tags, setTags] = useState<TagFromApi[]>([]);
	const [tagsAreFetching, setTagsAreFetching] = useState(false);

	const [addedTags, setAddedTags] = useState<string[]>(defaultValue || []);
	const [inputValue, setInputValue] = useState<string>("");

	// todo: implement infinite scroll
	const [, scrollRef] = useInfiniteScroll({
		hasMore: false,
		isEnabled: autocompleteIsOpen,
		onLoadMore: () => {}
	});

	const [shouldSubmit, setShouldSubmit] = useState(false);

	const submitIsDisabled = useMemo(
		() => inputValue.length === 0 || addedTags.includes(inputValue),
		[addedTags, inputValue]
	);

	const {showToast} = useToast();

	useEffect(() => {
		const fetchTags = async () => {
			setTagsAreFetching(true);
			try {
				const data = await getAllTags();
				setTags(data);
			} catch (e) {
				showToast({
					variant: "error",
					message: e instanceof Error ? e.message : "Something went wrong"
				});
			} finally {
				setTagsAreFetching(false);
			}
		};
		fetchTags();
	}, [showToast]);

	useEffect(() => {
		if (shouldSubmit && formRef.current) {
			formRef.current.requestSubmit();
			setShouldSubmit(false);
		}
	}, [formRef, shouldSubmit]);

	const addTag = () => {
		setAddedTags(prev => [...prev, inputValue]);
		setInputValue("");
	};
	const removeTag = (value: string) =>
		setAddedTags(prev => prev.filter(tag => tag !== value));

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (!submitIsDisabled) {
				addTag();
			} else {
				setShouldSubmit(true);
			}
		}
	};

	return (
		<div>
			<div className="flex items-start gap-4">
				<Autocomplete
					label="Tags"
					placeholder="Enter tag"
					isLoading={tagsAreFetching}
					defaultItems={tags}
					allowsCustomValue
					scrollRef={scrollRef}
					onOpenChange={setAutocompleteIsOpen}
					inputValue={inputValue}
					onInputChange={setInputValue}
					isInvalid={isInvalid}
					errorMessage={errorMessage}
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
			{addedTags.length !== 0 ? (
				<div className="flex gap-4 mt-2 overflow-x-auto">
					{addedTags.map(tag => (
						<Chip key={tag} onClose={() => removeTag(tag)} variant="flat">
							{tag}
						</Chip>
					))}
				</div>
			) : null}
			<input type="hidden" name="tags" value={JSON.stringify(addedTags)} />
		</div>
	);
};

export default TagsField;
