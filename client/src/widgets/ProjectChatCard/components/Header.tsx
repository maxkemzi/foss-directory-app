import {ProjectChatHeader} from "#src/entities/projectChat";
import {ShowProjectChatInfoClickArea} from "#src/features/projectChat/showInfo";
import {ProjectChatFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {FC} from "react";
import ActionsDropdown from "./ActionsDropdown";

interface Props {
	chat: ProjectChatFromApi;
	userId: Session["user"]["id"];
	onBurgerButtonClick: () => void;
}

const Header: FC<Props> = ({chat, userId, onBurgerButtonClick}) => {
	return (
		<ProjectChatHeader
			name={chat.name}
			memberCount={chat.memberCount}
			endSlot={
				userId !== chat.ownerUser.id ? (
					<ActionsDropdown projectId={chat.projectId} />
				) : null
			}
			clickAreaSlot={
				<ShowProjectChatInfoClickArea projectId={chat.projectId} />
			}
			onBurgerButtonClick={onBurgerButtonClick}
		/>
	);
};

export default Header;
