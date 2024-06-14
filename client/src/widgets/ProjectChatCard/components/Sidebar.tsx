"use client";

import {
	ProjectChat,
	ProjectChatList,
	ProjectChatSidebar
} from "#src/entities/project";
import {FetchMoreButton} from "#src/features/fetchMore";
import {ProjectFromApi} from "#src/shared/apis";
import {FC} from "react";

interface Props {
	projects: ProjectFromApi[];
	hasMore: boolean;
	isFetching: boolean;
	onFetchMore: () => void;
	isOpen: boolean;
	onClose: () => void;
	isChatActive?: (projectId: ProjectFromApi["id"]) => boolean;
	onChatClick?: (projectId: ProjectFromApi["id"]) => void;
}

const Sidebar: FC<Props> = ({
	projects,
	hasMore,
	isFetching,
	onFetchMore,
	isOpen,
	onClose,
	isChatActive,
	onChatClick
}) => {
	return (
		<ProjectChatSidebar
			isOpen={isOpen}
			onClose={onClose}
			contentSlot={
				<div className="h-full">
					<ProjectChatList>
						{projects.map(p => {
							return (
								<li key={p.id}>
									<button
										aria-label="select chat"
										className="w-full"
										onClick={() => onChatClick?.(p.id)}
										type="button"
									>
										<ProjectChat
											project={p}
											isActive={isChatActive?.(p.id) || false}
										/>
									</button>
								</li>
							);
						})}
					</ProjectChatList>
					{hasMore ? (
						<FetchMoreButton
							className="mt-4"
							isFetching={isFetching}
							onFetchMore={onFetchMore}
						/>
					) : null}
				</div>
			}
		/>
	);
};

export default Sidebar;
