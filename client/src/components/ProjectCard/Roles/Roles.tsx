import {ProjectFromApi} from "#src/types/apis";
import {Chip} from "@nextui-org/react";
import React, {FC} from "react";
import Link from "next/link";
import {ModalVariant, Pathname} from "#src/constants";

interface Props {
	projectRoles: ProjectFromApi["ProjectRoles"];
	requestable: boolean;
	isAuth: boolean;
}

const Roles: FC<Props> = ({projectRoles, requestable, isAuth}) => {
	if (projectRoles.every(pr => pr.count <= 0)) {
		return null;
	}

	return (
		<div className="flex gap-x-2 overflow-x-auto">
			{projectRoles.map(pr => {
				if (pr.count <= 0) {
					return null;
				}

				const renderChip = () => (
					<Chip variant="faded" color="success">
						{pr.Role.name} +{pr.count}
					</Chip>
				);

				if (requestable) {
					return (
						<Link
							key={pr.id}
							href={
								isAuth
									? `?modal=${ModalVariant.PROJECT_REQUEST}&project-role-id=${pr.id}`
									: Pathname.LOGIN
							}
						>
							{renderChip()}
						</Link>
					);
				}

				return <div key={pr.id}>{renderChip()}</div>;
			})}
		</div>
	);
};

export default Roles;
