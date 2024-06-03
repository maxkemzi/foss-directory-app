import {FC} from "react";

interface Props {
	text: string;
}

const MessageCardText: FC<Props> = ({text}) => {
	return <p className="[overflow-wrap:_anywhere]">{text}</p>;
};

export default MessageCardText;
