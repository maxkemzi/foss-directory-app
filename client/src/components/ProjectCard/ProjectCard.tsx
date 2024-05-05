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
	isAuth: boolean;
}

const ProjectCard: FC<Props> = ({project, requestable, isAuth}) => {
	return (
		<Card className="max-w-[400px]">
			<CardHeader>
				<p className="text-md">{project.name}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				{project.ProjectRoles.length !== 0 ? (
					<div className="mb-2">
						<Roles
							projectRoles={project.ProjectRoles}
							requestable={requestable}
							isAuth={isAuth}
						/>
					</div>
				) : null}
				<p>{project.description}</p>
				{project.ProjectTags.length !== 0 ? (
					<div className="mt-4">
						<Tags tags={project.ProjectTags} />
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
