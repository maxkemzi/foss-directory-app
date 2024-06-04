import {fetchApi} from "../actions";
import {LoginBody, SignupBody} from "./types";

const BASE_URL = "/auth";

const fetchAuthApi = (url: string, options: RequestInit = {}) => {
	return fetchApi(`${BASE_URL}${url}`, {cache: "no-store", ...options});
};

const fetchSignUp = async (body: SignupBody) => {
	const response = await fetchAuthApi("/signup", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});
	return response.json();
};

const fetchLogIn = async (body: LoginBody) => {
	const response = await fetchAuthApi("/login", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});
	return response.json();
};

const fetchLogOut = async (refreshToken: string) => {
	const response = await fetchAuthApi("/logout", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`}
	});
	return response.json();
};

const fetchRefresh = async (refreshToken: string) => {
	const response = await fetchAuthApi("/refresh", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`}
	});
	return response.json();
};

export {fetchLogIn, fetchLogOut, fetchRefresh, fetchSignUp};
export * from "./types";
