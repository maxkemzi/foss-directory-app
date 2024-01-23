"use server";

import {requestGithubConnectionUrl} from "#src/api";
import {COOKIE_OPTIONS} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const redirectToGithubConnectionUrl = async () => {
	const {url, CSRFToken} = await requestGithubConnectionUrl();

	const cookieStore = cookies();
	cookieStore.set("CSRFToken", CSRFToken, {...COOKIE_OPTIONS, sameSite: "lax"});

	redirect(url);
};

export {redirectToGithubConnectionUrl};
