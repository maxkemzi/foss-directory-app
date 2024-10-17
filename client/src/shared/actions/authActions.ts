"use server";

import {redirect} from "next/navigation";
import authApi, {LoginBody} from "../apis/auth";
import {isApiError} from "../apis/lib";
import {
	setServerAuthCookies,
	clearServerAuthCookies,
	getServerRefreshToken
} from "../auth";
import {Pathname} from "../constants";
import {AppError} from "../error";

const logIn = async (data: LoginBody) => {
	try {
		const response = await authApi.logIn(data);
		await setServerAuthCookies(response.session, response.refreshToken);
	} catch (e) {
		console.log(e);
		const message = isApiError(e) ? e.message : "Error logging in";
		throw new AppError(message);
	}
};

const logOut = async () => {
	const refreshToken = await getServerRefreshToken();

	if (!refreshToken) {
		redirect(Pathname.LOGIN);
	}

	try {
		await authApi.logOut(refreshToken);
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error logging out";
		throw new AppError(message);
	}

	await clearServerAuthCookies();

	redirect(Pathname.LOGIN);
};

export {logIn, logOut};
