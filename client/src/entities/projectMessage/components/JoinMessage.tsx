import {ProjectMessageFromApi} from "#src/shared/api";
import {Chip} from "@nextui-org/react";
import {FC} from "react";
import MessageText from "./MessageText";
import MessageTime from "./MessageTime";

interface Props {
	message: ProjectMessageFromApi;
}

const JoinMessage: FC<Props> = ({message}) => {
	const {text, createdAt} = message;

	return (
		<div className="flex flex-col gap-2 ml-auto mr-auto">
			<Chip size="lg">
				<MessageText text={text} />
			</Chip>
			<div className="self-center">
				<MessageTime isoDateString={createdAt} />
			</div>
		</div>
	);
};

export default JoinMessage;
