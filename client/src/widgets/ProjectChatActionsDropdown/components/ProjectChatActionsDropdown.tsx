"use client";

import {useLeaveProjectDropdownItemData} from "#src/features/project/leaveProject";
import {EllipsisDropdown} from "#src/shared/ui";
import {FC, useMemo} from "react";

interface Props {
	projectId: string;
}

const ProjectChatActionsDropdown: FC<Props> = ({projectId}) => {
	const leaveProjectItemData = useLeaveProjectDropdownItemData(projectId);

	const items = useMemo(() => [leaveProjectItemData], [leaveProjectItemData]);

	return <EllipsisDropdown items={items} />;
};

export default ProjectChatActionsDropdown;
