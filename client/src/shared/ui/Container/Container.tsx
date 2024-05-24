import classNames from "classnames";
import {FC, PropsWithChildren} from "react";

type Props = PropsWithChildren<{
	className?: string;
}>;

const Container: FC<Props> = ({children, className}) => (
	<div className={classNames("max-w-[1440px] px-6 mx-auto h-full", className)}>
		{children}
	</div>
);

export default Container;
