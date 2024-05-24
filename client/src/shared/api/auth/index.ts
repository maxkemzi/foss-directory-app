import {fetchApi} from "../actions";
import {LoginBody, SignupBody} from "./types";

const BASE_URL = "/auth";

const fetchSignUp = async (body: SignupBody) => {
	const response = await fetchApi(`${BASE_URL}/signup`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});
	return response.json();
};

const fetchLogIn = async (body: LoginBody) => {
	const response = await fetchApi(`${BASE_URL}/login`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});
	return response.json();
};

const fetchLogOut = async (refreshToken: string) => {
	const response = await fetchApi(`${BASE_URL}/logout`, {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`}
	});
	return response.json();
};

const fetchRefresh = async (refreshToken: string) => {
	const response = await fetchApi(`${BASE_URL}/refresh`, {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`}
	});
	return response.json();
};

export {fetchLogIn, fetchLogOut, fetchRefresh, fetchSignUp};
export * from "./types";
