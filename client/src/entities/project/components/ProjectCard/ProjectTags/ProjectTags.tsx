import {ProjectFromApi} from "#src/shared/api";
import {Chip} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	tags: ProjectFromApi["tags"];
}

const ProjectTags: FC<Props> = ({tags}) => {
	const tagsPerRow = Math.ceil(tags.length / 2);

	const firstRowTags = tags.slice(0, tagsPerRow);
	const secondRowTags = tags.slice(tagsPerRow);

	const renderTagRow = (items: ProjectFromApi["tags"]) => (
		<ul className="flex gap-x-2">
			{items.map(item => (
				<li key={item.id}>
					<Chip color="primary">{item.name}</Chip>
				</li>
			))}
		</ul>
	);

	return (
		<div className="flex flex-col gap-y-3 overflow-x-auto">
			{renderTagRow(firstRowTags)}
			{secondRowTags.length !== 0 ? renderTagRow(secondRowTags) : null}
		</div>
	);
};

export default ProjectTags;
