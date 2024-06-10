import {RepoFromApi} from "#src/shared/api";
import {useAction} from "#src/shared/hooks";
import {useToast} from "#src/shared/toast";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {FC, Key, KeyboardEventHandler, useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {getGithubRepos} from "../../../actions";

interface Props {
	onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const ReposField: FC<Props> = ({onKeyDown}) => {
	const {showToast} = useToast();

	const form = useFormContext();

	const [repos, setRepos] = useState<RepoFromApi[]>([]);
	const {execute, isPending} = useAction(getGithubRepos, {
		onSuccess: data => {
			setRepos(data.repos);
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

	useEffect(() => {
		execute();
	}, [execute]);

	const handleSelectionChange = (id: Key) => {
		form.reset();

		const repo = repos.find(r => r.id === Number(id));
		if (!repo) {
			return;
		}

		form.setValue("name", repo.name);
		form.setValue("description", repo.description);
		form.setValue("repoUrl", repo.url);
		form.setValue("tags", repo.topics);
	};

	return (
		<Autocomplete
			label="Repos"
			placeholder="Select repo"
			isLoading={isPending}
			defaultItems={repos}
			allowsCustomValue
			scrollRef={scrollRef}
			onOpenChange={setAutocompleteIsOpen}
			inputValue={autocompleteValue}
			onInputChange={setAutocompleteValue}
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
