import {ProjectMessageFromApi} from "#src/shared/apis";
import {Card, CardBody} from "@nextui-org/react";
import {FC} from "react";
import MessageText from "./MessageText";
import MessageTime from "./MessageTime";

interface Props {
	message: ProjectMessageFromApi;
}

const SequentialMessage: FC<Props> = ({message}) => {
	const {text, createdAt} = message;

	return (
		<div className="grid grid-cols-[32px,_auto] justify-start gap-4">
			<div className="flex flex-col items-start gap-2 col-start-2">
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

export default SequentialMessage;
