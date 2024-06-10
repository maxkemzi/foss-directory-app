"use server";

import {fetchGithubConnectionUrl} from "#src/shared/api/integrations/github";
import {isApiError} from "#src/shared/api/lib";
import {Cookie, CsrfTokenOption} from "#src/shared/constants";
import {cookies} from "next/headers";

const getGithubConnectionUrl = async () => {
	try {
		const {url, csrfToken} = await fetchGithubConnectionUrl();

		const cookieStore = cookies();
		cookieStore.set(Cookie.CSRF_TOKEN, csrfToken, {
			httpOnly: CsrfTokenOption.HTTP_ONLY,
			maxAge: CsrfTokenOption.MAX_AGE,
			secure: CsrfTokenOption.IS_SECURE,
			sameSite: CsrfTokenOption.SAME_SITE
		});

		return {success: "Github has been connected", url};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error connecting github";
		return {error};
	}
};

export {getGithubConnectionUrl};
