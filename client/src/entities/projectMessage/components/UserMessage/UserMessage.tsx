import {ProjectMessageFromApi} from "#src/shared/apis";
import {Card, CardBody} from "@nextui-org/react";
import {FC} from "react";
import Avatar from "./Avatar";
import MessageText from "../MessageText";
import MessageTime from "../MessageTime";

interface Props {
	message: ProjectMessageFromApi;
}

const UserMessage: FC<Props> = ({message}) => {
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
						<MessageText>{text}</MessageText>
					</CardBody>
				</Card>
				<MessageTime createdAt={createdAt} />
			</div>
		</div>
	);
};

export default UserMessage;
