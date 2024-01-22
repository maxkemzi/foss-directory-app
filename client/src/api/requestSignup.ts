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

const requestSignup = async (body: Body): Promise<Response> => {
	const response = await fetchApi("/auth/signup", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body),
		cache: "no-store"
	});

	return response.json();
};

export default requestSignup;
