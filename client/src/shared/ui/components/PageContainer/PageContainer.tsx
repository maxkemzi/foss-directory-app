import classNames from "classnames";
import {FC, PropsWithChildren} from "react";
import Container from "../Container/Container";

interface Props {
	className?: string;
}

const PageContainer: FC<PropsWithChildren<Props>> = ({children, className}) => (
	<Container className={classNames("flex flex-col gap-6", className)}>
		{children}
	</Container>
);

export default PageContainer;
