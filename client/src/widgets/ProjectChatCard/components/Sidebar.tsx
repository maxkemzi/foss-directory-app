"use client";

import {
	ProjectChat,
	ProjectChatList,
	ProjectChatSidebar
} from "#src/entities/project";
import {ProjectFromApi} from "#src/shared/api";
import {FC} from "react";

interface Props {
	projects: ProjectFromApi[];
	isOpen: boolean;
	onClose: () => void;
	isChatActive?: (projectId: ProjectFromApi["id"]) => boolean;
	onChatClick?: (projectId: ProjectFromApi["id"]) => void;
}

const Sidebar: FC<Props> = ({
	projects,
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
			}
		/>
	);
};

export default Sidebar;
