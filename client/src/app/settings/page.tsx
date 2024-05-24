import {getServerSession, logOut} from "#src/features/auth";
import {ConnectGithubButton} from "#src/features/integrations/github/connectGithub";
import {DeleteAccountButton} from "#src/features/user/account/deleteAccount";
import {Button} from "@nextui-org/react";

const Settings = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	return (
		<>
			<h1 className="text-5xl mb-6">Settings</h1>
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
		</>
	);
};

export default Settings;
