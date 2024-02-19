import {DocumentObject, ObjectFromDb} from "../types";

interface GithubConnectionFromDb extends ObjectFromDb {
	user_id: number;
	token: string;
}

interface GithubConnection extends DocumentObject {
	userId: number;
	token: string;
}

interface GithubConnectionPayload {
	userId: number;
	token: string;
}

export type {GithubConnection, GithubConnectionFromDb, GithubConnectionPayload};
