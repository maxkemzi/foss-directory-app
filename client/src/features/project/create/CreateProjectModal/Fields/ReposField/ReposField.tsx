import {useGithubRepoList} from "#src/entities/githubRepo";
import {useDebouncedCallback, useObserver} from "#src/shared/hooks";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {
	FC,
	Key,
	KeyboardEventHandler,
	useEffect,
	useRef,
	useState
} from "react";
import {useFormContext} from "react-hook-form";

interface Props {
	onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const ReposField: FC<Props> = ({onKeyDown}) => {
	const form = useFormContext();

	const {repos, hasMore, isFetching, fetchFirstPage, fetchMore} =
		useGithubRepoList();

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

	const handleSelectionChange = (id: Key) => {
		form.reset();

		const repo = repos.find(r => r.id === Number(id));
		if (!repo) {
			return;
		}

		form.setValue("name", repo.name, {shouldValidate: true});
		form.setValue("description", repo.description, {shouldValidate: true});
		form.setValue("repoUrl", repo.url, {shouldValidate: true});
		form.setValue("tags", repo.topics, {shouldValidate: true});
	};

	return (
		<Autocomplete
			label="Repos"
			placeholder="Select repo"
			isLoading={isFetching}
			items={repos}
			allowsCustomValue
			scrollRef={rootRef}
			onOpenChange={setAutocompleteIsOpen}
			inputValue={autocompleteValue}
			onInputChange={setAutocompleteValue}
			onSelectionChange={handleSelectionChange}
			onKeyDown={onKeyDown}
		>
			{item => {
				if (item.id === repos[repos.length - 1].id) {
					return (
						<AutocompleteItem key={item.id}>
							{item.name}
							<div ref={targetRef} className="invisible" />
						</AutocompleteItem>
					);
				}

				return <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>;
			}}
		</Autocomplete>
	);
};

export default ReposField;
