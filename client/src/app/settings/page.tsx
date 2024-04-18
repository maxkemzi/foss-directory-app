import {SubmitButton} from "#src/components";
import {Container} from "#src/components/ui";
import {AuthCookie} from "#src/constants";
import {parseUserCookieToJson} from "#src/helpers";
import {Button} from "@nextui-org/react";
import {cookies} from "next/headers";
import {Header} from "../(header)";
import DeleteAccountButton from "./DeleteAccountButton";
import {redirectToGithubConnectionUrl} from "./actions";

const Settings = () => {
	const cookieStore = cookies();
	// This page is protected by the middleware
	// This means that the "user" cookie has been set
	const userCookie = cookieStore.get(AuthCookie.USER)?.value!;
	const user = parseUserCookieToJson(userCookie);

	return (
		<>
			<Header />
			<main>
				<section>
					<Container>
						<div className="py-6">
							<h1 className="text-5xl mb-6">Settings</h1>
							<div className="mb-4">
								{user.githubIsConnected ? (
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