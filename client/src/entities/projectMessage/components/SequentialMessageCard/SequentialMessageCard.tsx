import {ProjectMessageFromApi} from "#src/shared/api";
import {Card, CardBody} from "@nextui-org/react";
import {FC} from "react";
import MessageCardText from "../MessageCardText/MessageCardText";
import MessageCardTime from "../MessageCardTime/MessageCardTime";

interface Props {
	message: ProjectMessageFromApi;
}

const SequentialMessageCard: FC<Props> = ({message}) => {
	const {text, createdAt} = message;

	return (
		<div className="grid grid-cols-[32px,_auto] justify-start gap-4">
			<div className="flex flex-col items-start gap-2 col-start-2">
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

export default SequentialMessageCard;
