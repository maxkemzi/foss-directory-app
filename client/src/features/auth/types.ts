interface LoginFormFields {
	email: string;
	password: string;
}

interface SignupFormFields {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export type {LoginFormFields, SignupFormFields};
