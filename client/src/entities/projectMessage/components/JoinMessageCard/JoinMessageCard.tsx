import {ProjectMessageFromApi} from "#src/shared/api";
import {Chip} from "@nextui-org/react";
import {FC} from "react";
import MessageCardText from "../MessageCardText/MessageCardText";
import MessageCardTime from "../MessageCardTime/MessageCardTime";

interface Props {
	message: ProjectMessageFromApi;
}

const JoinMessageCard: FC<Props> = ({message}) => {
	const {text, createdAt} = message;

	return (
		<div className="flex flex-col gap-2 ml-auto mr-auto">
			<Chip size="lg">
				<MessageCardText text={text} />
			</Chip>
			<div className="self-center">
				<MessageCardTime isoDateString={createdAt} />
			</div>
		</div>
	);
};

export default JoinMessageCard;
