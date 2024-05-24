import ApiError from "./ApiError";

const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;

export default isApiError;
