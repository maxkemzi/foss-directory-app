import {DocumentObject, ObjectFromDb} from "../types";

interface UserFromDb extends ObjectFromDb {
	username: string;
	email: string;
	password: string;
	github_connected: boolean;
}

interface User extends DocumentObject {
	username: UserFromDb["username"];
	email: UserFromDb["email"];
	password: UserFromDb["password"];
	githubIsConnected: UserFromDb["github_connected"];
}

interface UserPayload {
	username: string;
	email: string;
	password: string;
}

export type {User, UserFromDb, UserPayload};
