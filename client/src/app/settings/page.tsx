import {redirectToGithubConnectionUrl} from "#src/actions";
import {User} from "#src/api";
import {SubmitButton} from "#src/components";
import {Container} from "#src/components/ui";
import {Route} from "#src/constants";
import {Button} from "@nextui-org/react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Header} from "../(header)";
import DeleteAccountButton from "./DeleteAccountButton";

const Settings = () => {
	const cookieStore = cookies();
	const user = cookieStore.get("user")?.value;
	if (!user) {
		redirect(Route.LOGIN);
	}

	const parsedUser = JSON.parse(user) as User;

	return (
		<>
			<Header />
			<main>
				<section>
					<Container>
						<div className="py-6">
							<h1 className="text-5xl mb-6">Settings</h1>
							<div className="mb-4">
								{parsedUser.githubIsConnected ? (
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
