import {UserFromApi} from "../types";

interface LoginBody {
	email: string;
	password: string;
}

interface LoginResponse {
	tokens: {access: string; refresh: string};
	user: UserFromApi;
}

interface SignupBody {
	username: string;
	email: string;
	password: string;
}

interface SignupResponse {
	tokens: {access: string; refresh: string};
	user: UserFromApi;
}

interface RefreshResponse {
	tokens: {access: string; refresh: string};
	user: UserFromApi;
}

interface LogoutResponse {
	message: string;
}

export type {
	LoginBody,
	LoginResponse,
	LogoutResponse,
	RefreshResponse,
	SignupBody,
	SignupResponse
};
