import {ProjectFromApi} from "#src/shared/api";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Link
} from "@nextui-org/react";
import {FC} from "react";
import ProjectRoles from "./ProjectRoles/ProjectRoles";
import ProjectTags from "./ProjectTags/ProjectTags";

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
						<ProjectRoles
							roles={project.roles}
							projectId={project.id}
							requestable={requestable}
						/>
					</div>
				) : null}
				<p>{project.description}</p>
				{project.tags.length !== 0 ? (
					<div className="mt-4">
						<ProjectTags tags={project.tags} />
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
