import {ExtendedUserDto} from "../dtos";

interface SignUpPayload {
	username: string;
	email: string;
	password: string;
}

interface LogInPayload {
	email: string;
	password: string;
}

interface AuthSession {
	user: ExtendedUserDto;
	tokens: {access: string; refresh: string};
}

export type {SignUpPayload, LogInPayload, AuthSession};
