import {ProjectFromApi} from "#src/types";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Link
} from "@nextui-org/react";
import React, {FC} from "react";

interface Props {
	project: ProjectFromApi;
}

const ProjectCard: FC<Props> = ({project}) => {
	return (
		<Card className="max-w-[400px]">
			<CardHeader>
				<p className="text-md">{project.name}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>{project.description}</p>
			</CardBody>
			<Divider />
			<CardFooter>
				<Link isExternal showAnchorIcon href={project.repoUrl}>
					Visit source code.
				</Link>
			</CardFooter>
		</Card>
	);
};

export default ProjectCard;
