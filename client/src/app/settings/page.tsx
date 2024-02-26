import {UserFromApi} from "#src/api";
import {SubmitButton} from "#src/components";
import {Container} from "#src/components/ui";
import {Pathname} from "#src/constants";
import {Button} from "@nextui-org/react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Header} from "../(header)";
import DeleteAccountButton from "./DeleteAccountButton";
import {redirectToGithubConnectionUrl} from "./actions";

const Settings = () => {
	const cookieStore = cookies();
	const user = cookieStore.get("user")?.value;
	if (!user) {
		redirect(Pathname.LOGIN);
	}

	const parsedUser = JSON.parse(user) as UserFromApi;

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
