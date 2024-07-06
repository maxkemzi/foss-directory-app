import ApiError from "#src/lib/errors/ApiError";

const status = 404;
const message = "Not Found";
const code = "ERR_NOT_FOUND";

let result: ApiError;

beforeEach(() => {
	result = new ApiError(status, message, code);
});

it("should create an instance of ApiError", () => {
	expect(result).toBeInstanceOf(ApiError);
});

it("should set properties", () => {
	expect(result.status).toBe(status);
	expect(result.message).toBe(message);
	expect(result.code).toBe(code);
});

it("should have the correct prototype", () => {
	expect(Object.getPrototypeOf(result)).toBe(ApiError.prototype);
});
