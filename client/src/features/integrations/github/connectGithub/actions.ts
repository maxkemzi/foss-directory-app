"use server";

import githubApi, {
	FetchConnectionUrlResponse
} from "#src/shared/apis/integrations/github";
import {isApiError} from "#src/shared/apis/lib";
import {Cookie, CsrfTokenOption} from "#src/shared/constants";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";
import {cookies} from "next/headers";

const getConnectionUrl = async () => {
	try {
		const {data} = await githubApi.fetchConnectionUrl();

		const cookieStore = cookies();
		cookieStore.set(Cookie.CSRF_TOKEN, data.csrfToken, {
			httpOnly: CsrfTokenOption.HTTP_ONLY,
			maxAge: CsrfTokenOption.MAX_AGE,
			secure: CsrfTokenOption.IS_SECURE,
			sameSite: CsrfTokenOption.SAME_SITE
		});

		return data.url;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error connecting github";
		throw new AppError(message);
	}
};

const safeGetConnectionUrl: SafeAction<
	typeof getConnectionUrl,
	{url: FetchConnectionUrlResponse["data"]["url"]}
> = async () => {
	try {
		const url = await getConnectionUrl();

		return {success: "Github has been connected", data: {url}};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {safeGetConnectionUrl};
