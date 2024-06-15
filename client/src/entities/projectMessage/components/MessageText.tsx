import {FC, PropsWithChildren} from "react";

const MessageText: FC<PropsWithChildren> = ({children}) => {
	return <p className="[overflow-wrap:_anywhere]">{children}</p>;
};

export default MessageText;
