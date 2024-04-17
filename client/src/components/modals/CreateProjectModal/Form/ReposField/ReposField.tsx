import {RepoFromApi} from "#src/types/api";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {FC, Key, useEffect, useState} from "react";
import {getRepos} from "../actions";

interface Props {
	onSelectionChange: (repo?: RepoFromApi) => void;
}

const ReposField: FC<Props> = ({onSelectionChange}) => {
	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);

	const [repos, setRepos] = useState<RepoFromApi[]>([]);
	const [reposAreFetching, setReposAreFetching] = useState(false);

	const [inputValue, setInputValue] = useState<string>("");

	// todo: implement infinite scroll
	const [, scrollRef] = useInfiniteScroll({
		hasMore: false,
		isEnabled: autocompleteIsOpen,
		onLoadMore: () => {}
	});

	useEffect(() => {
		const fetchTags = async () => {
			setReposAreFetching(true);
			setRepos(await getRepos());
			setReposAreFetching(false);
		};
		fetchTags();
	}, []);

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
		>
			{item => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
		</Autocomplete>
	);
};

export default ReposField;
