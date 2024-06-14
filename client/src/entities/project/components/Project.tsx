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
		<Card classNames={{base: "max-w-[500px] h-full"}} fullWidth>
			<CardHeader>
				<p className="text-md">{project.name}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="flex flex-col h-full">
					{topSlot ? <div className="mb-2 flex-shrink-0">{topSlot}</div> : null}
					<p className="flex-grow [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis">
						{project.description}
					</p>
					{bottomSlot ? (
						<div className="mt-4 flex-shrink-0">{bottomSlot}</div>
					) : null}
				</div>
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
