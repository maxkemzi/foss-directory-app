"use server";

import githubApi from "#src/shared/apis/integrations/github";
import {isApiError} from "#src/shared/apis/lib";
import {Cookie, CsrfTokenOption} from "#src/shared/constants";
import {cookies} from "next/headers";

const getGithubConnectionUrl = async () => {
	try {
		const {data} = await githubApi.fetchConnectionUrl();

		const cookieStore = cookies();
		cookieStore.set(Cookie.CSRF_TOKEN, data.csrfToken, {
			httpOnly: CsrfTokenOption.HTTP_ONLY,
			maxAge: CsrfTokenOption.MAX_AGE,
			secure: CsrfTokenOption.IS_SECURE,
			sameSite: CsrfTokenOption.SAME_SITE
		});

		return {success: "Github has been connected", url: data.url};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error connecting github";
		return {error};
	}
};

export {getGithubConnectionUrl};
