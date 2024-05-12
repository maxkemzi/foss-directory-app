"use server";

import {fetchGithubConnectionUrl} from "#src/apis/integrations/github";
import {Cookie, CsrfTokenOption} from "#src/constants";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const redirectToGithubConnectionUrl = async () => {
	const {url, csrfToken} = await fetchGithubConnectionUrl();

	const cookieStore = cookies();
	cookieStore.set(Cookie.CSRF_TOKEN, csrfToken, {
		httpOnly: CsrfTokenOption.HTTP_ONLY,
		maxAge: CsrfTokenOption.MAX_AGE,
		secure: CsrfTokenOption.IS_SECURE,
		sameSite: CsrfTokenOption.SAME_SITE
	});

	redirect(url);
};

export {redirectToGithubConnectionUrl};
