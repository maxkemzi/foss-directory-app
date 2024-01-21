import {User} from "./types";
import fetchApi from "./fetchApi";

interface Body {
	email: string;
	password: string;
}

interface Response {
	tokens: {access: string; refresh: string};
	user: User;
}

const requestLogin = (body: Body) =>
	fetchApi<Response>("/auth/login", {
		method: "POST",
		body: JSON.stringify(body),
		cache: "no-store"
	});

export default requestLogin;
