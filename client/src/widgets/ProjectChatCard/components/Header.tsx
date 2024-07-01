import {ProjectChatHeader} from "#src/entities/project";
import {ShowProjectChatInfoClickArea} from "#src/features/project/showChatInfo";
import {ProjectFromApi} from "#src/shared/apis";
import {SessionFromApi} from "foss-directory-shared";
import {FC} from "react";
import ActionsDropdown from "./ActionsDropdown";

interface Props {
	project: ProjectFromApi;
	userId: SessionFromApi["user"]["id"];
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
