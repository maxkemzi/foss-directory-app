"use client";

import {ProjectFromApi} from "#src/shared/api";
import {Chip} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	role: ProjectFromApi["roles"][number];
}

const ProjectRole: FC<Props> = ({role}) => {
	const {name, placesAvailable} = role;

	return (
		<Chip variant="faded" color="success">
			{name} +{placesAvailable}
		</Chip>
	);
};

export default ProjectRole;
