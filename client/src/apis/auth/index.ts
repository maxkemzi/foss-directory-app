import {LoginBody, SignupBody} from "#src/types/apis/auth";
import {fetchApi} from "#src/actions/api";

const BASE_URL = "/auth";

const signUp = async (body: SignupBody) => {
	const response = await fetchApi(`${BASE_URL}/signup`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body),
		cache: "no-store"
	});
	return response.json();
};

const logIn = async (body: LoginBody) => {
	const response = await fetchApi(`${BASE_URL}/login`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body),
		cache: "no-store"
	});
	return response.json();
};

const logOut = async (refreshToken: string) => {
	const response = await fetchApi(`${BASE_URL}/logout`, {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`},
		cache: "no-store"
	});
	return response.json();
};

const refresh = async (refreshToken: string) => {
	const response = await fetchApi(`${BASE_URL}/refresh`, {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`},
		cache: "no-store"
	});
	return response.json();
};

const check = async (accessToken: string) => {
	const response = await fetchApi(`${BASE_URL}/check`, {
		method: "POST",
		body: JSON.stringify({accessToken}),
		headers: {"content-type": "application/json"},
		cache: "no-store"
	});
	return response.json();
};

export {check, logIn, logOut, refresh, signUp};
