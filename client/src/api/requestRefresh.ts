import {cookies} from "next/headers";
import ApiError from "./ApiError";
import fetchApi from "./fetchApi";
import {User} from "./types";

interface Response {
	tokens: {access: string; refresh: string};
	user: User;
}

const requestRefresh = async (): Promise<Response> => {
	const cookieStore = cookies();

	const refreshToken = cookieStore.get("refreshToken")?.value;
	if (!refreshToken) {
		throw new ApiError(401, "Not authorized.");
	}

	const response = await fetchApi("/auth/refresh", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`},
		cache: "no-store"
	});

	return response.json();
};

export default requestRefresh;
