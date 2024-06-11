import {ProjectFromApi} from "#src/shared/apis";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Link
} from "@nextui-org/react";
import {FC, ReactNode} from "react";

interface Props {
	project: ProjectFromApi;
	topSlot?: ReactNode;
	bottomSlot?: ReactNode;
}

const Project: FC<Props> = ({project, topSlot, bottomSlot}) => {
	return (
		<Card classNames={{base: "max-w-[500px]"}} fullWidth>
			<CardHeader>
				<p className="text-md">{project.name}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				{topSlot ? <div className="mb-2">{topSlot}</div> : null}
				<p>{project.description}</p>
				{bottomSlot ? <div className="mt-4">{bottomSlot}</div> : null}
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

export default Project;
