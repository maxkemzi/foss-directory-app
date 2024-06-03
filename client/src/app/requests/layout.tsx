import {Body} from "#src/shared/ui";
import {Header} from "#src/widgets/Header";
import {FC, PropsWithChildren} from "react";

const RequestsLayout: FC<PropsWithChildren> = ({children}) => {
	return (
		<>
			<Header />
			<Body>{children}</Body>
		</>
	);
};

export default RequestsLayout;
