type EnvVar =
	| "PORT"
	| "POSTGRES_HOST"
	| "POSTGRES_USER"
	| "POSTGRES_PASSWORD"
	| "POSTGRES_DATABASE"
	| "POSTGRES_PORT"
	| "JWT_ACCESS_SECRET"
	| "JWT_REFRESH_SECRET"
	| "JWT_CSRF_SECRET"
	| "ENCRYPTION_KEY"
	| "ENCRYPTION_IV"
	| "GITHUB_CLIENT_ID"
	| "GITHUB_CLIENT_SECRET"
	| "PUBLIC_CLIENT_URL"
	| "PUBLIC_SERVER_URL"
	| "SMTP_HOST"
	| "SMTP_PORT"
	| "SMPT_USER"
	| "SMTP_PASSWORD";

type RequiredEnvVar = Exclude<EnvVar, "PORT">;

type EnvVars = {[key in EnvVar]?: string};

type EnvVarsWithRequiredSet = {
	[key in EnvVar]: key extends RequiredEnvVar ? string : string | undefined;
};

type ParsedEnvVars = Omit<
	EnvVarsWithRequiredSet,
	"PORT" | "POSTGRES_PORT" | "ENCRYPTION_KEY" | "ENCRYPTION_IV" | "SMTP_PORT"
> & {
	PORT: number;
	POSTGRES_PORT: number;
	ENCRYPTION_KEY: Buffer;
	ENCRYPTION_IV: Buffer;
	SMTP_PORT: number;
};

export type {
	EnvVars,
	EnvVarsWithRequiredSet,
	ParsedEnvVars,
	EnvVar,
	RequiredEnvVar
};