import {cookies} from "next/headers";
import fetchApi from "./fetchApi";
import ApiError from "./ApiError";

interface Response {
	message: string;
}

const requestLogout = async (): Promise<Response> => {
	const cookieStore = cookies();

	const refreshToken = cookieStore.get("refreshToken")?.value;
	if (!refreshToken) {
		throw new ApiError(401, "Not authorized.");
	}

	const response = await fetchApi("/auth/logout", {
		method: "POST",
		headers: {Cookie: `refreshToken=${refreshToken}`},
		cache: "no-store"
	});

	return response.json();
};

export default requestLogout;
