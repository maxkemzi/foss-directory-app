import {UserFromApi} from "../../apis";

interface Session {
	user: UserFromApi;
	tokens: {access: string; refresh: string};
}

export type {Session};
