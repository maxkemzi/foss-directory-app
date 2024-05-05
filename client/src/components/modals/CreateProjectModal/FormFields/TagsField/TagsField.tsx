import {TagFromApi} from "#src/types/apis";
import {PlusIcon} from "@heroicons/react/24/solid";
import {Autocomplete, AutocompleteItem, Button, Chip} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {FC, useEffect, useState} from "react";
import {getTags} from "../actions";

interface Props {
	isInvalid: boolean;
	errorMessage?: string;
	isDisabled?: boolean;
	defaultValue?: string[];
}

const TagsField: FC<Props> = ({
	isInvalid,
	errorMessage,
	isDisabled,
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

	useEffect(() => {
		const fetchTags = async () => {
			setTagsAreFetching(true);
			setTags(await getTags());
			setTagsAreFetching(false);
		};
		fetchTags();
	}, []);

	const addTag = () => {
		setAddedTags(prev => [...prev, inputValue]);
		setInputValue("");
	};
	const removeTag = (value: string) =>
		setAddedTags(prev => prev.filter(tag => tag !== value));

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
					isDisabled={isDisabled}
				>
					{item => (
						<AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
					)}
				</Autocomplete>
				<Button
					isIconOnly
					onClick={addTag}
					isDisabled={inputValue.length === 0 || addedTags.includes(inputValue)}
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
