import {SessionFromApi} from "foss-directory-shared";
import {ApiResponse, UserFromApi} from "../types";

interface LoginBody {
	email: string;
	password: string;
}

interface LoginResponseData {
	success: true;
}
type LoginResponse = ApiResponse<LoginResponseData> & {
	session: SessionFromApi;
	refreshToken: string;
};

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
	success: true;
}
type RefreshResponse = ApiResponse<RefreshResponseData> & {
	session: SessionFromApi;
};

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
