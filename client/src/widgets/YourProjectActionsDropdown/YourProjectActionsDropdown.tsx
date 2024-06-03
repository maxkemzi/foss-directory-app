"use client";

import {useDeleteProjectDropdownItem} from "#src/features/project/deleteProject";
import {EllipsisDropdown} from "#src/shared/ui";
import {FC, useMemo} from "react";

interface Props {
	projectId: string;
}

const YourProjectActionsDropdown: FC<Props> = ({projectId}) => {
	const deleteProjectItem = useDeleteProjectDropdownItem(projectId);

	const items = useMemo(() => [deleteProjectItem], [deleteProjectItem]);

	return <EllipsisDropdown items={items} />;
};

export default YourProjectActionsDropdown;
