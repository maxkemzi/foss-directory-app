import {ProjectMessageFromApi} from "#src/shared/apis";
import {Card, CardBody} from "@nextui-org/react";
import {FC} from "react";
import MessageText from "./MessageText";
import MessageTime from "./MessageTime";

interface Props {
	message: ProjectMessageFromApi;
}

const YourMessage: FC<Props> = ({message}) => {
	const {text, createdAt} = message;

	return (
		<div className="flex flex-col items-end gap-2 ml-auto">
			<Card classNames={{base: "bg-primary"}}>
				<CardBody>
					<MessageText>{text}</MessageText>
				</CardBody>
			</Card>
			<div className="self-end">
				<MessageTime isoDateString={createdAt} />
			</div>
		</div>
	);
};

export default YourMessage;
