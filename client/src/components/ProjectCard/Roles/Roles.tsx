import {ModalVariant} from "#src/constants";
import {ProjectFromApi} from "#src/types/apis";
import {Chip} from "@nextui-org/react";
import Link from "next/link";
import {FC} from "react";

interface Props {
	roles: ProjectFromApi["roles"];
	projectId: string;
	requestable: boolean;
}

const Roles: FC<Props> = ({roles, projectId, requestable}) => {
	return (
		<div className="flex gap-x-2 overflow-x-auto">
			{roles.map(r => {
				const renderChip = () => (
					<Chip variant="faded" color="success">
						{r.name} +{r.placesAvailable}
					</Chip>
				);

				if (requestable) {
					return (
						<Link
							key={r.id}
							href={`?modal=${ModalVariant.PROJECT_REQUEST}&project-id=${projectId}&project-role-id=${r.id}`}
						>
							{renderChip()}
						</Link>
					);
				}

				return <div key={r.id}>{renderChip()}</div>;
			})}
		</div>
	);
};

export default Roles;
