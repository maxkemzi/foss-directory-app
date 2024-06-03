import classNames from "classnames";
import {FC, PropsWithChildren} from "react";

interface Props {
	className?: string;
}

const PageContent: FC<PropsWithChildren<Props>> = ({children, className}) => (
	<div className={classNames("", className)}>{children}</div>
);

export default PageContent;
