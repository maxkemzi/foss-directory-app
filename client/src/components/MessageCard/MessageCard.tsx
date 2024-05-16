import {ProjectMessageFromApi} from "#src/types/apis";
import {Avatar, Card, CardBody, Chip} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	message: ProjectMessageFromApi;
	isMine: boolean;
	isSequential: boolean;
}

const MessageCard: FC<Props> = ({message, isMine, isSequential}) => {
	const {id, text, type, user, createdAt} = message;

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
			<div key={id} className="flex flex-col gap-2 ml-auto">
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
				<div className="flex flex-col gap-2 col-start-2">
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

	if (user) {
		return (
			<div key={id} className="grid grid-cols-[32px,_auto] justify-start gap-4">
				<Avatar size="sm" isBordered color="secondary" name={user.username} />
				<div className="flex flex-col gap-2">
					<p className="font-semibold">{user.role.name}</p>
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
			<div className="flex flex-col gap-2">
				<p className="font-semibold">Unknown</p>
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

export default MessageCard;
