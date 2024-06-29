import {ApiErrorInfoType, ApiErrorKey} from "./types";

const ApiErrorInfo: Record<ApiErrorKey, ApiErrorInfoType> = {
	// // General
	BAD_REQUEST: {
		message: "Bad request.",
		code: "badRequest"
	},
	UNAUTHORIZED: {
		message: "Unauthorized.",
		code: "unauthorized"
	},
	INTERNAL_SERVER: {
		message: "Internal server error.",
		code: "internalServer"
	},
	TOO_MANY_REQUESTS: {
		message: "Too many requests.",
		code: "tooManyRequests"
	},
	FORBIDDEN: {
		message: "Forbidden.",
		code: "forbidden"
	},
	// // Auth
	AUTH_MISSING_HEADER: {
		message: "Authorization header is missing.",
		code: "authMissingHeader"
	},
	AUTH_INVALID_HEADER: {
		message: "Invalid authorization header.",
		code: "authInvalidHeader"
	},
	AUTH_EXISTING_EMAIL: {
		message: "Email already exists.",
		code: "authExistingEmail"
	},
	AUTH_NON_EXISTING_EMAIL: {
		message: "Email doesn't exist.",
		code: "authNonExistingEmail"
	},
	AUTH_EXISTING_USERNAME: {
		message: "Username already exists.",
		code: "authExistingUsername"
	},
	AUTH_WRONG_PASSWORD: {
		message: "Wrong password.",
		code: "authWrongPassword"
	},
	AUTH_INVALID_TOKEN: {
		message: "Session token is invalid.",
		code: "authInvalidToken"
	},
	// // Github
	GITHUB_ALREADY_CONNECTED: {
		message: "You are already connected to GitHub.",
		code: "githubAlreadyConnected"
	},
	GITHUB_CONNECTION_REQUIRED: {
		message: "You must be connected to GitHub in order to perform this action.",
		code: "githubConnectionRequired"
	},
	GITHUB_EXCEEDED_RATE_LIMIT: {
		message: "GitHub API rate limit exceeded. Try again later.",
		code: "githubExceededRateLimit"
	},
	GITHUB_EXPIRED_TOKEN: {
		message: "Your GitHub token has expired, connect to GitHub again.",
		code: "githubExpiredToken"
	},
	GITHUB_UNVERIFIED_EMAIL: {
		message: "You need to verify your GitHub email.",
		code: "githubUnverifiedEmail"
	},
	GITHUB_INVALID_CSRF_TOKEN: {
		message: "Invalid CSRF token.",
		code: "githubInvalidCsrfToken"
	},
	// // Project
	PROJECT_NOT_FOUND: {
		message: "Project was not found.",
		code: "projectNotFound"
	},
	PROJECT_OWNER_PERMISSION_REQUIRED: {
		message:
			"Only the owner of the project has permission to perform this action.",
		code: "projectOwnerPermissionRequired"
	},
	PROJECT_MEMBER_PERMISSION_REQUIRED: {
		message:
			"Only the member of the project has permission to perform this action.",
		code: "projectMemberPermissionRequired"
	},
	// // Project request
	PROJECT_REQUEST_NOT_FOUND: {
		message: "Project request was not found.",
		code: "projectRequestNotFound"
	},
	PROJECT_REQUEST_RECEIVER_PERMISSION_REQUIRED: {
		message:
			"Only the receiver of the project request has permission to perform this action.",
		code: "projectRequestReceiverPermissionRequired"
	},
	PROJECT_REQUEST_ALREADY_MEMBER: {
		message: "The members of the project can't perform this action.",
		code: "projectRequestAlreadyMember"
	},
	// // User
	USER_NOT_FOUND: {
		message: "User was not found.",
		code: "userNotFound"
	}
};

export {ApiErrorInfo};
