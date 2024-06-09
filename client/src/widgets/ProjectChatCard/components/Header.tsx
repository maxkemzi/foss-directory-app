import {ProjectChatHeader} from "#src/entities/project";
import {ShowProjectChatInfoClickArea} from "#src/features/project/showChatInfo";
import {ProjectFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {FC} from "react";
import ActionsDropdown from "./ActionsDropdown";

interface Props {
	project: ProjectFromApi;
	userId: Session["user"]["id"];
	onBurgerButtonClick: () => void;
}

const Header: FC<Props> = ({project, userId, onBurgerButtonClick}) => {
	const {name, memberCount, id, ownerUser} = project;
	return (
		<ProjectChatHeader
			name={name}
			memberCount={memberCount}
			endSlot={
				userId !== ownerUser.id ? <ActionsDropdown projectId={id} /> : null
			}
			clickAreaSlot={<ShowProjectChatInfoClickArea projectId={id} />}
			onBurgerButtonClick={onBurgerButtonClick}
		/>
	);
};

export default Header;
