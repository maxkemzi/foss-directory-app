import {ProjectMessageFromApi} from "#src/shared/apis";
import {Chip} from "@nextui-org/react";
import {FC} from "react";
import MessageText from "./MessageText";
import MessageContainer from "./MessageContainer";

interface Props {
	message: ProjectMessageFromApi;
}

const DateMessage: FC<Props> = ({message}) => {
	const {text} = message;

	return (
		<MessageContainer>
			<div className="ml-auto mr-auto">
				<Chip size="lg">
					<MessageText text={text} />
				</Chip>
			</div>
		</MessageContainer>
	);
};

export default DateMessage;
