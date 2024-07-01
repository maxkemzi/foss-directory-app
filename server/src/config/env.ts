import {config} from "dotenv-safe";
import {z} from "zod";

config();

const VARS = {
	PORT: process.env.PORT,
	POSTGRES_HOST: process.env.POSTGRES_HOST,
	POSTGRES_USER: process.env.POSTGRES_USER,
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
	POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
	POSTGRES_PORT: process.env.POSTGRES_PORT,
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	JWT_CSRF_SECRET: process.env.JWT_CSRF_SECRET,
	JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET,
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

const commonValidation = () => z.string().trim().min(1);

const stringToNumber = (value: string, ctx: z.RefinementCtx) => {
	const transformed = parseInt(value, 10);

	if (Number.isNaN(transformed)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Not a number."
		});

		return z.NEVER;
	}

	return transformed;
};

const createStringToBuffer = (length: number) => {
	return (value: string, ctx: z.RefinementCtx) => {
		try {
			const transformed = Buffer.from(value, "hex");

			if (transformed.length !== length) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Must be ${length} bytes long.`
				});

				return z.NEVER;
			}

			return transformed;
		} catch (e) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Invalid value to create buffer from."
			});

			return z.NEVER;
		}
	};
};

const VARS_VALIDATION_SCHEMA = z.object({
	PORT: commonValidation().transform(stringToNumber),
	POSTGRES_HOST: commonValidation(),
	POSTGRES_USER: commonValidation(),
	POSTGRES_PASSWORD: commonValidation(),
	POSTGRES_DATABASE: commonValidation(),
	POSTGRES_PORT: commonValidation().transform(stringToNumber),
	JWT_ACCESS_SECRET: commonValidation(),
	JWT_REFRESH_SECRET: commonValidation(),
	JWT_CSRF_SECRET: commonValidation(),
	JWT_EMAIL_SECRET: commonValidation(),
	ENCRYPTION_KEY: commonValidation().transform(createStringToBuffer(32)),
	ENCRYPTION_IV: commonValidation().transform(createStringToBuffer(16)),
	GITHUB_CLIENT_ID: commonValidation(),
	GITHUB_CLIENT_SECRET: commonValidation(),
	PUBLIC_CLIENT_URL: commonValidation().url(),
	PUBLIC_SERVER_URL: commonValidation().url(),
	SMTP_HOST: commonValidation(),
	SMTP_PORT: commonValidation().transform(stringToNumber),
	SMPT_USER: commonValidation().email(),
	SMTP_PASSWORD: commonValidation()
});

const env = VARS_VALIDATION_SCHEMA.parse(VARS);
export default env;
