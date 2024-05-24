"use client";

import {ProjectFromApi} from "#src/shared/api";
import {Chip} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	projectRole: ProjectFromApi["roles"][number];
	onClick: () => void;
	disabled: boolean;
}

const ProjectRole: FC<Props> = ({projectRole, onClick, disabled}) => {
	const {name, placesAvailable} = projectRole;

	return (
		<button onClick={onClick} disabled={disabled} type="button">
			<Chip variant="faded" color="success">
				{name} +{placesAvailable}
			</Chip>
		</button>
	);
};

export default ProjectRole;
