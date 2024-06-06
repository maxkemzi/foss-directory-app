import {FC} from "react";

interface Props {
	text: string;
}

const MessageText: FC<Props> = ({text}) => {
	return <p className="[overflow-wrap:_anywhere]">{text}</p>;
};

export default MessageText;
