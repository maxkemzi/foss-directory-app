import {FC, PropsWithChildren} from "react";

const Container: FC<PropsWithChildren> = ({children}) => (
	<div className="max-w-[1440px] px-6 mx-auto h-full">{children}</div>
);

export default Container;
