import {ProjectMessageFromApi} from "#src/shared/api";
import {StarIcon} from "@heroicons/react/16/solid";
import {Avatar, Badge, Card, CardBody, Chip} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	message: ProjectMessageFromApi;
	isMine: boolean;
	isSequential: boolean;
}

const ProjectMessageCard: FC<Props> = ({message, isMine, isSequential}) => {
	const {id, text, type, sender, createdAt} = message;

	const date = new Date(createdAt);
	const formattedTime = new Intl.DateTimeFormat("en", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(date);

	if (type === "join") {
		return (
			<div key={id} className="flex flex-col gap-2 ml-auto mr-auto">
				<Chip size="lg">{text}</Chip>
				<p className="self-center text-sm text-foreground-400">
					{formattedTime}
				</p>
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
				<p className="self-end text-sm text-foreground-400">{formattedTime}</p>
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
					<p className="text-sm text-foreground-400">{formattedTime}</p>
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
					<p className="text-sm text-foreground-400">{formattedTime}</p>
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
				<p className="text-sm text-foreground-400">{formattedTime}</p>
			</div>
		</div>
	);
};

export default ProjectMessageCard;
