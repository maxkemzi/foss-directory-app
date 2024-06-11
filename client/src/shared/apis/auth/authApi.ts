import {fetchApi} from "../actions";
import {
	LoginBody,
	LoginResponse,
	LogoutResponse,
	RefreshResponse,
	SignupBody,
	SignupResponse
} from "./types";

const BASE_URL = "/auth";

const fetchAuthApi = (url: string, options: RequestInit = {}) => {
	return fetchApi(`${BASE_URL}${url}`, {cache: "no-store", ...options});
};

const signUp = async (body: SignupBody): Promise<SignupResponse> => {
	const response = await fetchAuthApi("/signup", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});

	const data = await response.json();
	return {data};
};

const logIn = async (body: LoginBody): Promise<LoginResponse> => {
	const response = await fetchAuthApi("/login", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});

	const data = await response.json();
	return {data};
};

const logOut = async (refreshToken: string): Promise<LogoutResponse> => {
	const response = await fetchAuthApi("/logout", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`}
	});

	const data = await response.json();
	return {data};
};

const refresh = async (refreshToken: string): Promise<RefreshResponse> => {
	const response = await fetchAuthApi("/refresh", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`}
	});

	const data = await response.json();
	return {data};
};

export {logIn, logOut, refresh, signUp};
