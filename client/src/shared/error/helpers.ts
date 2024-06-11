import AppError from "./AppError";

const isAppError = (e: unknown): e is AppError => e instanceof AppError;

export {isAppError};
