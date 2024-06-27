const AuthError = {
	AUTH_HEADER_MISSING: {
		message: "Authorization header is missing.",
		code: "auth_header_missing"
	},
	INVALID_AUTH_HEADER: {
		message: "Invalid authorization header.",
		code: "auth_invalid_header"
	},
	EMAIL_ALREADY_EXISTS: {
		message: "Email already exists.",
		code: "auth_email_already_exists"
	},
	EMAIL_DOES_NOT_EXIST: {
		message: "Email doesn't exist.",
		code: "auth_email_does_not_exist"
	},
	USERNAME_ALREADY_EXISTS: {
		message: "Username already exists.",
		code: "auth_username_already_exists"
	},
	WRONG_PASSWORD: {
		message: "Wrong password.",
		code: "auth_wrong_password"
	},
	INVALID_TOKEN: {
		message: "Session token is invalid.",
		code: "auth_invalid_token"
	}
};

const GithubError = {
	ALREADY_CONNECTED: {
		message: "You are already connected to GitHub.",
		code: "github_already_connected"
	},
	CONNECTION_REQUIRED: {
		message:
			"Your must be connected to GitHub in order to perform this action.",
		code: "github_connection_required"
	},
	RATE_LIMIT_EXCEEDED: {
		message: "GitHub API rate limit exceeded. Try again later.",
		code: "github_rate_limit_exceeded"
	},
	TOKEN_EXPIRED: {
		message: "Your GitHub token has expired, connect to GitHub again.",
		code: "github_token_expired"
	},
	UNVERIFIED_EMAIL: {
		message: "You need to verify your GitHub email.",
		code: "github_email_unverified"
	},
	INVALID_CSRF_TOKEN: {
		message: "Invalid CSRF token.",
		code: "github_csrf_token_invalid"
	}
};

const ProjectError = {
	NOT_FOUND: {
		message: "Project was not found.",
		code: "project_not_found"
	},
	OWNER_PERMISSION_REQUIRED: {
		message:
			"Only the owner of the project has permission to perform this action.",
		code: "project_owner_permission_required"
	},
	MEMBER_PERMISSION_REQUIRED: {
		message:
			"Only the member of the project has permission to perform this action.",
		code: "project_member_permission_required"
	}
};

const ProjectRequestError = {
	NOT_FOUND: {
		message: "Project request was not found.",
		code: "project_request_not_found"
	},
	RECEIVER_PERMISSION_REQUIRED: {
		message:
			"Only the receiver of the project request has permission to perform this action.",
		code: "project_request_receiver_permission_required"
	},
	ALREADY_MEMBER: {
		message: "The members of the project can't perform this action.",
		code: "project_request_already_member"
	}
};

const UserError = {
	NOT_FOUND: {
		message: "User was not found.",
		code: "user_not_found"
	}
};

export {AuthError, GithubError, ProjectError, ProjectRequestError, UserError};
