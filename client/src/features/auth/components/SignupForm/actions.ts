"use server";

import {fetchSignUp} from "#src/shared/api/auth";
import {FormFields} from "./types";

const signUp = async (data: FormFields) => {
	await fetchSignUp(data);
};

export {signUp};
