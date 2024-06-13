"use server";

import authApi from "#src/shared/apis/auth";
import {isApiError} from "#src/shared/apis/lib";
import {logIn} from "#src/shared/auth";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";
import {SignupFormFields} from "./types";

const safeLogIn: SafeAction<typeof logIn> = async data => {
	try {
		await logIn(data);
		return {success: "Successfully logged in"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error logging in";
		return {error};
	}
};

const signUp = async (data: SignupFormFields) => {
	try {
		const response = await authApi.signUp(data);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error signing up";
		throw new AppError(message);
	}
};

const safeSignUp: SafeAction<typeof signUp> = async data => {
	try {
		await signUp(data);
		return {success: "Successfully signed up"};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {safeLogIn, safeSignUp};
