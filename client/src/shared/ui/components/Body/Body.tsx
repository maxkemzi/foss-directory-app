import classNames from "classnames";
import {FC, PropsWithChildren} from "react";

interface Props {
	className?: string;
}

const Body: FC<PropsWithChildren<Props>> = ({children, className}) => (
	<main className={classNames("py-6", className)}>{children}</main>
);

export default Body;
