import {useToast} from "#src/shared/toast";
import {RepoFromApi} from "#src/shared/api";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {FC, Key, KeyboardEventHandler, useEffect, useState} from "react";
import {getMyGithubRepos} from "../actions";

interface Props {
	onSelectionChange: (repo?: RepoFromApi) => void;
	onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const ReposField: FC<Props> = ({onSelectionChange, onKeyDown}) => {
	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);

	const [repos, setRepos] = useState<RepoFromApi[]>([]);
	const [reposAreFetching, setReposAreFetching] = useState(false);

	const [inputValue, setInputValue] = useState<string>("");

	const {showToast} = useToast();

	// todo: implement infinite scroll
	const [, scrollRef] = useInfiniteScroll({
		hasMore: false,
		isEnabled: autocompleteIsOpen,
		onLoadMore: () => {}
	});

	useEffect(() => {
		const fetchTags = async () => {
			setReposAreFetching(true);
			try {
				setRepos(await getMyGithubRepos());
			} catch (e) {
				showToast({
					variant: "error",
					message: e instanceof Error ? e.message : "Something went wrong."
				});
			} finally {
				setReposAreFetching(false);
			}
		};
		fetchTags();
	}, [showToast]);

	const handleSelectionChange = (id: Key) => {
		const repo = repos.find(el => el.id === Number(id));
		onSelectionChange?.(repo);
	};

	return (
		<Autocomplete
			label="Repos"
			placeholder="Select repo"
			isLoading={reposAreFetching}
			defaultItems={repos}
			allowsCustomValue
			scrollRef={scrollRef}
			onOpenChange={setAutocompleteIsOpen}
			inputValue={inputValue}
			onInputChange={setInputValue}
			onSelectionChange={handleSelectionChange}
			onKeyDown={onKeyDown}
			// The following prop fixes the bug in nextui library
			// https://github.com/nextui-org/nextui/issues/2554
			allowsEmptyCollection={false}
			//
		>
			{item => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
		</Autocomplete>
	);
};

export default ReposField;
