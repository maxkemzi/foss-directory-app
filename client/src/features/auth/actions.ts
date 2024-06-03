"use server";

import {fetchSignUp} from "#src/shared/api/auth";
import {SignupFormFields} from "./types";

const signUp = async (data: SignupFormFields) => {
	await fetchSignUp(data);
};

export {signUp};
