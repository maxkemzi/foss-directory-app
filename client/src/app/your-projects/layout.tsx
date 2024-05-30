import {Container} from "#src/shared/ui";
import {FC, PropsWithChildren} from "react";
import {Header} from "#src/widgets/Header";

const YourProjectsLayout: FC<PropsWithChildren> = ({children}) => {
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

export default YourProjectsLayout;
