"use client";

import {ProjectList, useProjectList} from "#src/entities/project";
import {FetchMoreButton} from "#src/features/fetchMore";
import {FetchProjectsResponse} from "#src/shared/apis/projects";
import {useDebouncedCallback} from "#src/shared/hooks";
import {ChipsInput, SearchInput} from "#src/shared/ui";
import {ProjectCard} from "#src/widgets/ProjectCard";
import {FC, useCallback, useEffect, useState} from "react";

interface Props {
	serverResponse: FetchProjectsResponse;
}

const Content: FC<Props> = ({serverResponse}) => {
	const [search, setSearch] = useState<string | null>(null);
	const [searchTags, setSearchTags] = useState<string[] | null>(null);

	const {projects, fetchFirstPage, fetchMore, hasMore, isFetching} =
		useProjectList("all", serverResponse);
	const fetchFirstPageWithDebounce = useDebouncedCallback(fetchFirstPage);

	useEffect(() => {
		if (search === null && searchTags === null) {
			return;
		}

		fetchFirstPageWithDebounce({
			search: search || undefined,
			searchTags: searchTags || undefined
		});
	}, [fetchFirstPageWithDebounce, search, searchTags]);

	const fetchMoreWithSearch = useCallback(
		() =>
			fetchMore({
				search: search || undefined,
				searchTags: searchTags || undefined
			}),
		[fetchMore, search, searchTags]
	);

	const handleSearch = (value: string) => setSearch(value);

	const handleTagsChange = (values: string[]) => setSearchTags(values);

	return (
		<>
			<div className="flex w-full justify-center gap-4 mb-4">
				<SearchInput
					classNames={{base: "max-w-[40%]"}}
					onSearch={handleSearch}
					placeholder="Search by name or description"
				/>
				<ChipsInput
					className="max-w-[30%]"
					onChange={handleTagsChange}
					inputProps={{placeholder: "Search by tags"}}
				/>
			</div>
			{projects.length !== 0 ? (
				<ProjectList>
					{projects.map(p => (
						<ProjectCard key={p.id} project={p} />
					))}
				</ProjectList>
			) : (
				<p>There are no projects</p>
			)}
			{hasMore ? (
				<FetchMoreButton
					className="mt-4"
					isFetching={isFetching}
					onFetchMore={fetchMoreWithSearch}
				/>
			) : null}
		</>
	);
};

export default Content;
