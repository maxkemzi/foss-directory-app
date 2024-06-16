import {ProjectMessageFromApi} from "#src/shared/apis";
import {Chip} from "@nextui-org/react";
import {FC} from "react";
import MessageText from "./MessageText";
import MessageTime from "./MessageTime";

interface Props {
	message: ProjectMessageFromApi;
}

const JoinMessage: FC<Props> = ({message}) => {
	const {sender, createdAt} = message;

	return (
		<div className="flex flex-col gap-2 ml-auto mr-auto">
			<Chip size="lg">
				<MessageText>
					{sender?.user.username || "unknown"} joined the project
				</MessageText>
			</Chip>
			<div className="self-center">
				<MessageTime createdAt={createdAt} />
			</div>
		</div>
	);
};

export default JoinMessage;
