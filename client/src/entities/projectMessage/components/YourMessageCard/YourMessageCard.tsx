import {ProjectMessageFromApi} from "#src/shared/api";
import {Card, CardBody} from "@nextui-org/react";
import {FC} from "react";
import MessageCardText from "../MessageCardText/MessageCardText";
import MessageCardTime from "../MessageCardTime/MessageCardTime";

interface Props {
	message: ProjectMessageFromApi;
}

const YourMessageCard: FC<Props> = ({message}) => {
	const {text, createdAt} = message;

	return (
		<div className="flex flex-col items-end gap-2 ml-auto">
			<Card classNames={{base: "bg-primary"}}>
				<CardBody>
					<MessageCardText text={text} />
				</CardBody>
			</Card>
			<div className="self-end">
				<MessageCardTime isoDateString={createdAt} />
			</div>
		</div>
	);
};

export default YourMessageCard;
