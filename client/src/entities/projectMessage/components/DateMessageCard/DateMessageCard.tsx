import {ProjectMessageFromApi} from "#src/shared/api";
import {Chip} from "@nextui-org/react";
import {FC} from "react";
import MessageCardContainer from "../MessageCardContainer/MessageCardContainer";
import MessageCardText from "../MessageCardText/MessageCardText";

interface Props {
	message: ProjectMessageFromApi;
}

const DateMessageCard: FC<Props> = ({message}) => {
	const {text} = message;

	return (
		<MessageCardContainer>
			<div className="ml-auto mr-auto">
				<Chip size="lg">
					<MessageCardText text={text} />
				</Chip>
			</div>
		</MessageCardContainer>
	);
};

export default DateMessageCard;
