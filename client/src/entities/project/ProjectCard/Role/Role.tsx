"use client";

import {ProjectFromApi} from "#src/shared/api";
import {Chip} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	role: ProjectFromApi["roles"][number];
	onClick: () => void;
	disabled: boolean;
}

const Role: FC<Props> = ({role, onClick, disabled}) => {
	const {name, placesAvailable} = role;

	return (
		<button onClick={onClick} disabled={disabled} type="button">
			<Chip variant="faded" color="success">
				{name} +{placesAvailable}
			</Chip>
		</button>
	);
};

export default Role;
