import {User} from "./types";
import fetchApi from "./fetchApi";

interface Body {
	username: string;
	email: string;
	password: string;
}

interface Response {
	tokens: {access: string; refresh: string};
	user: User;
}

const requestSignup = (body: Body) =>
	fetchApi<Response>("/auth/signup", {
		method: "POST",
		body: JSON.stringify(body),
		cache: "no-store"
	});

export default requestSignup;
