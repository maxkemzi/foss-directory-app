import {cookies} from "next/headers";
import fetchApi from "./fetchApi";
import ApiError from "./ApiError";

type Response = boolean;

const requestCheck = async (): Promise<Response> => {
	const cookieStore = cookies();

	const accessToken = cookieStore.get("accessToken")?.value;
	if (!accessToken) {
		throw new ApiError(401, "Not authorized.");
	}

	const response = await fetchApi("/auth/check", {
		method: "POST",
		headers: {Cookie: `accessToken=${accessToken}`},
		cache: "no-store"
	});

	return response.json();
};

export default requestCheck;
