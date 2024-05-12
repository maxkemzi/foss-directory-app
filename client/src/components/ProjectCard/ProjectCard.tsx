import {ProjectFromApi} from "#src/types/apis";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Link
} from "@nextui-org/react";
import {FC} from "react";
import Roles from "./Roles/Roles";
import Tags from "./Tags/Tags";

interface Props {
	project: ProjectFromApi;
	requestable: boolean;
}

const ProjectCard: FC<Props> = ({project, requestable}) => {
	return (
		<Card classNames={{base: "max-w-[500px]"}} fullWidth>
			<CardHeader>
				<p className="text-md">{project.name}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				{project.roles.length !== 0 ? (
					<div className="mb-2">
						<Roles
							roles={project.roles.reverse()}
							projectId={project.id}
							requestable={requestable}
						/>
					</div>
				) : null}
				<p>{project.description}</p>
				{project.tags.length !== 0 ? (
					<div className="mt-4">
						<Tags tags={project.tags.reverse()} />
					</div>
				) : null}
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
