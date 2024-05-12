import {fetchContributedProjects} from "#src/apis/projects";
import {Container} from "#src/components/ui";
import {FC, PropsWithChildren} from "react";
import {Header} from "../(header)";
import ChatSidebar from "./ChatSidebar";

const ChatsLayout: FC<PropsWithChildren> = async ({children}) => {
	const projects = await fetchContributedProjects();

	return (
		<>
			<Header />
			<main>
				<section className="py-6">
					<Container>
						<h1 className="text-5xl mb-6">Chats</h1>
						<div className="grid grid-cols-[200px,_1fr] grid-rows-[70vh] gap-6">
							<ChatSidebar projects={projects} />
							{children}
						</div>
					</Container>
				</section>
			</main>
		</>
	);
};

export default ChatsLayout;
