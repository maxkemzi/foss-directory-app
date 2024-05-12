import {getServerSession} from "#src/actions/auth";
import {redirectToGithubConnectionUrl} from "#src/actions/integrations";
import {SubmitButton} from "#src/components";
import {Container} from "#src/components/ui";
import {Button} from "@nextui-org/react";
import {Header} from "../(header)";
import DeleteAccountButton from "./DeleteAccountButton";

const Settings = async () => {
	const session = await getServerSession();

	return (
		<>
			<Header />
			<main>
				<section>
					<Container>
						<div className="py-6">
							<h1 className="text-5xl mb-6">Settings</h1>
							<div className="mb-4">
								{session && session.user.githubIsConnected ? (
									<Button isDisabled>Github is connected</Button>
								) : (
									<form action={redirectToGithubConnectionUrl}>
										<SubmitButton>Connect Github</SubmitButton>
									</form>
								)}
							</div>
							<div>
								<DeleteAccountButton />
							</div>
						</div>
					</Container>
				</section>
			</main>
		</>
	);
};

export default Settings;
