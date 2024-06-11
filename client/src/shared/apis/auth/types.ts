import {ApiResponse, UserFromApi} from "../types";

interface LoginBody {
	email: string;
	password: string;
}

interface LoginResponseData {
	tokens: {access: string; refresh: string};
	user: UserFromApi;
}
type LoginResponse = ApiResponse<LoginResponseData>;

interface SignupBody {
	username: string;
	email: string;
	password: string;
}

interface SignupResponseData {
	tokens: {access: string; refresh: string};
	user: UserFromApi;
}
type SignupResponse = ApiResponse<SignupResponseData>;

interface RefreshResponseData {
	tokens: {access: string; refresh: string};
	user: UserFromApi;
}
type RefreshResponse = ApiResponse<RefreshResponseData>;

interface LogoutResponseData {
	message: string;
}
type LogoutResponse = ApiResponse<LogoutResponseData>;

export type {
	LoginBody,
	LoginResponse,
	LogoutResponse,
	RefreshResponse,
	SignupBody,
	SignupResponse
};
