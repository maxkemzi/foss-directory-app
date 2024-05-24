import {Container} from "#src/shared/ui";
import {FC, PropsWithChildren} from "react";
import {Header} from "#src/widgets/Header";

const ChatsLayout: FC<PropsWithChildren> = ({children}) => {
	return (
		<>
			<Header />
			<main>
				<section className="py-6">
					<Container>
						<h1 className="text-5xl mb-6">Chats</h1>
						{children}
					</Container>
				</section>
			</main>
		</>
	);
};

export default ChatsLayout;
