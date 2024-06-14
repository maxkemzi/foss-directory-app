"use client";

import {
	ProjectRequestList,
	useProjectRequestList
} from "#src/entities/projectRequest";
import {FetchMoreButton} from "#src/features/fetchMore";
import {FetchProjectRequestsResponse} from "#src/shared/apis/projects/requests";
import {ProjectRequestCard} from "#src/widgets/ProjectRequestCard";
import {FC} from "react";

interface Props {
	response: FetchProjectRequestsResponse;
}

const List: FC<Props> = ({response}) => {
	const {requests, isFetching, hasMore, fetchMore} =
		useProjectRequestList(response);

	return (
		<div className="sm:w-max">
			<ProjectRequestList>
				{requests.map(r => {
					return <ProjectRequestCard key={r.id} request={r} />;
				})}
			</ProjectRequestList>
			{hasMore ? (
				<FetchMoreButton
					className="mt-4"
					isFetching={isFetching}
					onFetchMore={fetchMore}
				/>
			) : null}
		</div>
	);
};

export default List;
