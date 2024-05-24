"use server";

import {fetchGithubConnectionUrl} from "#src/shared/api/integrations/github";
import {Cookie, CsrfTokenOption} from "#src/shared/constants";
import {cookies} from "next/headers";

const getGithubConnectionUrl = async () => {
	const {url, csrfToken} = await fetchGithubConnectionUrl();

	const cookieStore = cookies();
	cookieStore.set(Cookie.CSRF_TOKEN, csrfToken, {
		httpOnly: CsrfTokenOption.HTTP_ONLY,
		maxAge: CsrfTokenOption.MAX_AGE,
		secure: CsrfTokenOption.IS_SECURE,
		sameSite: CsrfTokenOption.SAME_SITE
	});

	return url;
};

export {getGithubConnectionUrl};
