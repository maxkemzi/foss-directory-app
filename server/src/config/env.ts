import "dotenv/config";
import {
	EnvVars,
	EnvVarsWithRequiredSet,
	ParsedEnvVars,
	RequiredEnvVar
} from "./types";

const VARS: EnvVars = {
	PORT: process.env.PORT,
	POSTGRES_HOST: process.env.POSTGRES_HOST,
	POSTGRES_USER: process.env.POSTGRES_USER,
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
	POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
	POSTGRES_PORT: process.env.POSTGRES_PORT,
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	JWT_CSRF_SECRET: process.env.JWT_CSRF_SECRET,
	ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
	ENCRYPTION_IV: process.env.ENCRYPTION_IV,
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
	PUBLIC_CLIENT_URL: process.env.PUBLIC_CLIENT_URL,
	PUBLIC_SERVER_URL: process.env.PUBLIC_SERVER_URL,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: process.env.SMTP_PORT,
	SMPT_USER: process.env.SMPT_USER,
	SMTP_PASSWORD: process.env.SMTP_PASSWORD
};

const REQUIRED_VARS: RequiredEnvVar[] = [
	"POSTGRES_HOST",
	"POSTGRES_USER",
	"POSTGRES_PASSWORD",
	"POSTGRES_DATABASE",
	"POSTGRES_PORT",
	"JWT_ACCESS_SECRET",
	"JWT_REFRESH_SECRET",
	"JWT_CSRF_SECRET",
	"ENCRYPTION_KEY",
	"ENCRYPTION_IV",
	"GITHUB_CLIENT_ID",
	"GITHUB_CLIENT_SECRET",
	"PUBLIC_CLIENT_URL",
	"PUBLIC_SERVER_URL",
	"SMTP_HOST",
	"SMTP_PORT",
	"SMPT_USER",
	"SMTP_PASSWORD"
];

const ensureRequiredVarsSet = (
	vars: EnvVars,
	requiredVars: RequiredEnvVar[]
) => {
	const notSetVars: RequiredEnvVar[] = [];

	requiredVars.forEach(name => {
		if (vars[name] === undefined) {
			notSetVars.push(name);
		}
	});

	if (notSetVars.length > 0) {
		throw new Error(
			`The following environment variables are not set:\n- ${notSetVars.join(
				"\n- "
			)}`
		);
	}

	return vars as EnvVarsWithRequiredSet;
};

const parseVars = (vars: EnvVarsWithRequiredSet): ParsedEnvVars => {
	const parseNumeric = (name: string, value: string): number => {
		const number = Number(value);

		if (Number.isNaN(number)) {
			throw new Error(`${name} must be a number.`);
		}

		return number;
	};

	const parseHexStr = (name: string, value: string, length: number): Buffer => {
		const buffer = Buffer.from(value, "hex");

		if (buffer.length !== length) {
			throw new Error(`Invalid ${name} length. It must be ${length} bytes.`);
		}

		return buffer;
	};

	return {
		...vars,
		PORT: vars.PORT ? parseNumeric("PORT", vars.PORT) : 5000,
		POSTGRES_PORT: parseNumeric("POSTGRES_PORT", vars.POSTGRES_PORT),
		ENCRYPTION_KEY: parseHexStr("ENCRYPTION_KEY", vars.ENCRYPTION_KEY, 32),
		ENCRYPTION_IV: parseHexStr("ENCRYPTION_IV", vars.ENCRYPTION_IV, 16),
		SMTP_PORT: parseNumeric("SMTP_PORT", vars.SMTP_PORT)
	};
};

const initVars = (): ParsedEnvVars => {
	const varsWithRequiredSet = ensureRequiredVarsSet(VARS, REQUIRED_VARS);

	return parseVars(varsWithRequiredSet);
};

const env = initVars();

export default env;
