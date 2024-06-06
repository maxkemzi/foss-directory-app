"use client";

import {
	ProjectChat,
	ProjectChatList,
	ProjectChatSidebar
} from "#src/entities/projectChat";
import {ProjectChatFromApi} from "#src/shared/api";
import {FC} from "react";

interface Props {
	chats: ProjectChatFromApi[];
	isOpen: boolean;
	onClose: () => void;
	isChatActive?: (projectId: ProjectChatFromApi["projectId"]) => boolean;
	onChatClick?: (projectId: ProjectChatFromApi["projectId"]) => void;
}

const Sidebar: FC<Props> = ({
	chats,
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
					{chats.map(c => {
						return (
							<li key={c.projectId}>
								<button
									aria-label="select chat"
									className="w-full"
									onClick={() => onChatClick?.(c.projectId)}
									type="button"
								>
									<ProjectChat
										chat={c}
										isActive={isChatActive?.(c.projectId) || false}
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
