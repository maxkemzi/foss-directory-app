import {StarIcon} from "@heroicons/react/16/solid";
import {Avatar, Badge, Card, CardBody, Chip} from "@nextui-org/react";
import {FC} from "react";
import {ProjectMessageCardProps} from "../../types";

const ProjectMessageCard: FC<ProjectMessageCardProps> = ({
	message,
	isMine,
	isSequential
}) => {
	const {id, text, type, sender, createdAt} = message;

	if (type === "join") {
		return (
			<div key={id} className="flex flex-col gap-2 ml-auto mr-auto">
				<Chip size="lg">{text}</Chip>
				<p className="self-center text-sm text-foreground-400">{createdAt}</p>
			</div>
		);
	}

	if (type === "date") {
		return (
			<div key={id} className="flex flex-col gap-2 ml-auto mr-auto">
				<Chip size="lg">{text}</Chip>
			</div>
		);
	}

	if (isMine) {
		return (
			<div key={id} className="flex flex-col items-end gap-2 ml-auto">
				<Card classNames={{base: "bg-primary"}}>
					<CardBody>
						<p>{text}</p>
					</CardBody>
				</Card>
				<p className="self-end text-sm text-foreground-400">{createdAt}</p>
			</div>
		);
	}

	if (isSequential) {
		return (
			<div key={id} className="grid grid-cols-[32px,_auto] justify-start gap-4">
				<div className="flex flex-col items-start gap-2 col-start-2">
					<Card classNames={{base: "bg-content2"}}>
						<CardBody>
							<p>{text}</p>
						</CardBody>
					</Card>
					<p className="text-sm text-foreground-400">{createdAt}</p>
				</div>
			</div>
		);
	}

	if (sender) {
		const avatarJsx = (
			<Avatar
				isBordered
				size="sm"
				color="secondary"
				name={sender.user.username}
			/>
		);

		return (
			<div key={id} className="grid grid-cols-[32px,_auto] justify-start gap-4">
				<div>
					{sender.isOwner ? (
						<Badge
							isOneChar
							content={<StarIcon className="w-[16px] h-[16px]" />}
							variant="solid"
							color="primary"
							shape="circle"
							placement="top-right"
							size="sm"
						>
							{avatarJsx}
						</Badge>
					) : (
						avatarJsx
					)}
				</div>

				<div className="flex flex-col items-start gap-2">
					<div>
						<p className="font-semibold">{sender.role?.name || "Unknown"}</p>
						<p>{sender.user.username}</p>
					</div>
					<Card classNames={{base: "bg-content2"}}>
						<CardBody>
							<p>{text}</p>
						</CardBody>
					</Card>
					<p className="text-sm text-foreground-400">{createdAt}</p>
				</div>
			</div>
		);
	}

	return (
		<div key={id} className="grid grid-cols-[32px,_auto] justify-start gap-4">
			<Avatar size="sm" isBordered color="secondary" name="unknown" />
			<div className="flex flex-col items-start gap-2">
				<div>
					<p className="font-semibold">Unknown</p>
					<p>Unknown</p>
				</div>
				<Card classNames={{base: "bg-content2"}}>
					<CardBody>
						<p>{text}</p>
					</CardBody>
				</Card>
				<p className="text-sm text-foreground-400">{createdAt}</p>
			</div>
		</div>
	);
};

export default ProjectMessageCard;
