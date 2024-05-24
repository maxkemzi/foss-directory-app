import {Container} from "#src/shared/ui";
import {Header} from "#src/widgets/Header";
import {FC, PropsWithChildren} from "react";

const RequestsLayout: FC<PropsWithChildren> = ({children}) => {
	return (
		<>
			<Header />
			<main>
				<section className="py-6">
					<Container>{children}</Container>
				</section>
			</main>
		</>
	);
};

export default RequestsLayout;
