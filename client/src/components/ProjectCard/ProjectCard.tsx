import {ProjectFromApi} from "#src/types";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Chip,
	Divider,
	Link
} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	project: ProjectFromApi;
}

const ProjectCard: FC<Props> = ({project}) => {
	const renderTags = () => {
		const tagsPerRow = Math.ceil(project.Tags.length / 2);

		const firstRowTags = project.Tags.slice(0, tagsPerRow);
		const secondRowTags = project.Tags.slice(tagsPerRow);

		const renderTagRow = (tags: ProjectFromApi["Tags"]) => (
			<ul className="flex gap-x-2">
				{tags.map(tag => (
					<li key={tag.id}>
						<Chip color="primary">{tag.name}</Chip>
					</li>
				))}
			</ul>
		);

		return (
			<div className="mt-4 flex flex-col gap-y-3 overflow-x-auto">
				{renderTagRow(firstRowTags)}
				{secondRowTags.length !== 0 ? renderTagRow(secondRowTags) : null}
			</div>
		);
	};

	return (
		<Card className="max-w-[400px]">
			<CardHeader>
				<p className="text-md">{project.name}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>{project.description}</p>
				{project.Tags.length !== 0 ? renderTags() : null}
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
