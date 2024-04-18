"use server";

import {GithubApi} from "#src/apis";
import {COOKIE_OPTIONS} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const redirectToGithubConnectionUrl = async () => {
	const {url, csrfToken} = await GithubApi.fetchConnectionUrl();

	const cookieStore = cookies();
	cookieStore.set("csrfToken", csrfToken, {
		...COOKIE_OPTIONS,
		sameSite: "lax"
	});

	redirect(url);
};

export {redirectToGithubConnectionUrl};
