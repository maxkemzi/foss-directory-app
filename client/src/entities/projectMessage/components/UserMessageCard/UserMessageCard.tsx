import {ProjectMessageFromApi} from "#src/shared/api";
import {Card, CardBody} from "@nextui-org/react";
import {FC} from "react";
import MessageCardText from "../MessageCardText/MessageCardText";
import MessageCardTime from "../MessageCardTime/MessageCardTime";
import Avatar from "./Avatar";

interface Props {
	message: ProjectMessageFromApi;
}

const UserMessageCard: FC<Props> = ({message}) => {
	const {text, sender, createdAt} = message;

	return (
		<div className="grid grid-cols-[32px,_auto] justify-start gap-4">
			<Avatar sender={sender} />

			<div className="flex flex-col items-start gap-2">
				<div>
					<p className="font-semibold">{sender?.role?.name || "Unknown"}</p>
					<p>{sender?.user.username || "Unknown"}</p>
				</div>
				<Card classNames={{base: "bg-content2"}}>
					<CardBody>
						<MessageCardText text={text} />
					</CardBody>
				</Card>
				<MessageCardTime isoDateString={createdAt} />
			</div>
		</div>
	);
};

export default UserMessageCard;
