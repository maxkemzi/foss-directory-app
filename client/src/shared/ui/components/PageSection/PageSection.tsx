import classNames from "classnames";
import {FC, PropsWithChildren} from "react";

interface Props {
	className?: string;
}

const PageSection: FC<PropsWithChildren<Props>> = ({children, className}) => (
	<section className={classNames(className)}>{children}</section>
);

export default PageSection;
