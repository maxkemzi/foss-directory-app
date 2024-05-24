import {UserFromApi} from "../api/types";

interface Session {
	user: UserFromApi;
	tokens: {access: string; refresh: string};
}

export type {Session};
