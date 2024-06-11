"use server";

import authApi from "#src/shared/apis/auth";
import {isApiError} from "#src/shared/apis/lib";
import {logIn} from "#src/shared/auth";
import {LoginFormFields, SignupFormFields} from "./types";

const logInAction = async (data: LoginFormFields) => {
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
		await authApi.signUp(data);
		return {success: "Successfully signed up"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error signing up";
		return {error};
	}
};

export {logInAction, signUp};
