import {Bars2Icon} from "@heroicons/react/16/solid";
import {Button, Card, CardBody} from "@nextui-org/react";
import {FC, ReactNode} from "react";
import {parseMemberCount} from "../helpers";

interface Props {
	name: string;
	memberCount: number;
	endSlot?: ReactNode;
	clickAreaSlot?: ReactNode;
	onBurgerButtonClick?: () => void;
}

const ProjectChatHeader: FC<Props> = ({
	name,
	memberCount,
	endSlot,
	clickAreaSlot,
	onBurgerButtonClick
}) => {
	return (
		<Card fullWidth classNames={{body: "p-0"}}>
			<CardBody>
				<div className="flex items-center">
					<div className="md:hidden z-10 p-4 pr-2">
						<Button isIconOnly onClick={onBurgerButtonClick}>
							<Bars2Icon className="w-[24px] h-[24px]" />
						</Button>
					</div>
					<div className="relative w-full flex items-center p-4 gap-4 max-md:pl-2">
						<div>
							<h3 className="font-bold">{name}</h3>
							<p className="text-foreground-400">
								{parseMemberCount(memberCount)}
							</p>
						</div>
						{endSlot ? <div className="ml-auto">{endSlot}</div> : null}
						{clickAreaSlot ? (
							<div className="contents">{clickAreaSlot}</div>
						) : null}
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default ProjectChatHeader;
