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

const requestLogin = (body: Body) => {
	return fetchApi<Response>("/auth/login", {
		method: "POST",
		body: JSON.stringify(body)
	});
};

export default requestLogin;
