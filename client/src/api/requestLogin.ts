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

const requestLogin = async (body: Body): Promise<Response> => {
	const response = await fetchApi("/auth/login", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body),
		cache: "no-store"
	});
	return response.json();
};

export default requestLogin;
