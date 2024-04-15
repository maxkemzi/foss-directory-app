"use server";

import {GithubApi} from "#src/api";
import {COOKIE_OPTIONS} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const redirectToGithubConnectionUrl = async () => {
	const {url, CsrfToken} = await GithubApi.fetchConnectionUrl();

	const cookieStore = cookies();
	cookieStore.set("CsrfToken", CsrfToken, {
		...COOKIE_OPTIONS,
		sameSite: "lax"
	});

	redirect(url);
};

export {redirectToGithubConnectionUrl};
