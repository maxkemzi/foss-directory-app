import {useGithubRepoList} from "#src/entities/githubRepo";
import {useDebouncedCallback, useObserver} from "#src/shared/hooks";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {
	FC,
	Key,
	KeyboardEvent,
	KeyboardEventHandler,
	useEffect,
	useRef,
	useState
} from "react";
import {useFormContext} from "react-hook-form";
import {INITIAL_FIELD_VALUES} from "../../../constants";
import {FormValues} from "../../../types";

interface Props {
	onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const ReposField: FC<Props> = ({onKeyDown}) => {
	const form = useFormContext<FormValues>();

	const {repos, hasMore, isFetching, fetchFirstPage, fetchMore} =
		useGithubRepoList();
	const [search, setSearch] = useState("");

	const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);

	const rootRef = useRef(null);
	const targetRef = useRef(null);
	useObserver(targetRef, {
		hasMore,
		isEnabled: autocompleteIsOpen && !isFetching,
		rootRef,
		rootMargin: "0px 0px 75px 0px",
		onIntersect: () => fetchMore({search})
	});

	const fetchFirstPageWithDebounce = useDebouncedCallback(fetchFirstPage);
	useEffect(() => {
		fetchFirstPageWithDebounce({search});
	}, [search, fetchFirstPageWithDebounce]);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setSearch(target.value);

		onKeyDown(e);
	};

	const handleSelectionChange = (id: Key) => {
		setSearch("");

		if (id === null) {
			form.reset(INITIAL_FIELD_VALUES);
		}

		const repo = repos.find(r => r.id === Number(id));
		if (repo) {
			form.reset({
				...INITIAL_FIELD_VALUES,
				name: repo.name,
				description: repo.description || INITIAL_FIELD_VALUES.description,
				repoUrl: repo.url,
				tags: repo.topics
			});
			form.trigger();
		}
	};

	const handleClear = () => {
		setSearch("");
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
			onKeyDown={handleKeyDown}
			onSelectionChange={handleSelectionChange}
			clearButtonProps={{onClick: handleClear}}
			listboxProps={{
				bottomContent: <div ref={targetRef} className="invisible" />
			}}
		>
			{item => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
		</Autocomplete>
	);
};

export default ReposField;
