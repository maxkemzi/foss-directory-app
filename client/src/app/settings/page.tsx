import {ConnectGithubButton} from "#src/features/integrations/github/connectGithub";
import {DeleteAccountButton} from "#src/features/user/account/deleteAccount";
import {authActions} from "#src/shared/actions";
import {getServerSession} from "#src/shared/auth";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import {Button} from "@nextui-org/react";

const Settings = async () => {
	const session = await getServerSession();
	if (!session) {
		return authActions.logOut();
	}

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Settings</PageTitle>
				<PageContent>
					<div className="mb-4">
						{session.user.githubIsConnected ? (
							<Button isDisabled>Github is connected</Button>
						) : (
							<ConnectGithubButton />
						)}
					</div>
					<div>
						<DeleteAccountButton />
					</div>
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default Settings;
