class AppError extends Error {
	constructor(message: Error["message"]) {
		super(message);

		// Restore prototype chain
		Object.setPrototypeOf(this, AppError.prototype);
	}
}

export default AppError;
