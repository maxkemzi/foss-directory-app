import {parseProjectContributorCount} from "#src/entities/project";
import {Card, CardBody} from "@nextui-org/react";
import {FC, ReactNode} from "react";

interface Props {
	name: string;
	contributorCount: number;
	rightSlot?: ReactNode;
	clickAreaSlot?: ReactNode;
}

const ProjectChatHeader: FC<Props> = ({
	name,
	contributorCount,
	rightSlot,
	clickAreaSlot
}) => {
	return (
		<Card fullWidth>
			<CardBody>
				<div className="flex items-center gap-4">
					<div>
						<h3 className="font-bold">{name}</h3>
						<p className="text-foreground-400">
							{parseProjectContributorCount(contributorCount)}
						</p>
					</div>
					{rightSlot ? <div className="ml-auto">{rightSlot}</div> : null}
				</div>
				{clickAreaSlot}
			</CardBody>
		</Card>
	);
};

export type {Props as ProjectChatHeaderProps};
export default ProjectChatHeader;
