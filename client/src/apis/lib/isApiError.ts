import ApiError from "./ApiError";

const isApiError = (e: unknown): e is ApiError => {
	return e instanceof ApiError;
};

export default isApiError;
