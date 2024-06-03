import classNames from "classnames";
import {FC, PropsWithChildren} from "react";

interface Props {
	className?: string;
}

const PageTitle: FC<PropsWithChildren<Props>> = ({children, className}) => (
	<h1
		className={classNames(
			"text-3xl md:text-4xl xl:text-5xl capitalize",
			className
		)}
	>
		{children}
	</h1>
);

export default PageTitle;
