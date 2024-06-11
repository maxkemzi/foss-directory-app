import {UserFromApi} from "../apis/types";

interface Session {
	user: UserFromApi;
	tokens: {access: string; refresh: string};
}

export type {Session};
