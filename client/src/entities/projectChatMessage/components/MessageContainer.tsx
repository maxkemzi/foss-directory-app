import {FC, PropsWithChildren} from "react";

const MessageContainer: FC<PropsWithChildren> = ({children}) => {
	return <div className="w-full flex">{children}</div>;
};

export default MessageContainer;
