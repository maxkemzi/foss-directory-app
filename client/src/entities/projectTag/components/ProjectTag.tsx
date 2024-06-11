import {ProjectFromApi} from "#src/shared/apis";
import {Chip} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	tag: ProjectFromApi["tags"][number];
}

const ProjectTag: FC<Props> = ({tag}) => {
	return <Chip color="primary">{tag.name}</Chip>;
};

export default ProjectTag;
