import {
	Body,
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import {Header} from "#src/widgets/Header";
import {FC, PropsWithChildren} from "react";

const ChatsLayout: FC<PropsWithChildren> = ({children}) => {
	return (
		<>
			<Header />
			<Body>
				<PageSection>
					<PageContainer>
						<PageTitle>Chats</PageTitle>
						<PageContent>{children}</PageContent>
					</PageContainer>
				</PageSection>
			</Body>
		</>
	);
};

export default ChatsLayout;
