import {FC, PropsWithChildren} from "react";

const MessageCardContainer: FC<PropsWithChildren> = ({children}) => {
	return <div className="w-full flex">{children}</div>;
};

export default MessageCardContainer;
