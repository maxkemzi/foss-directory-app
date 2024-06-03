"use client";

import {Pathname} from "#src/shared/constants";
import {useFormAction} from "#src/shared/hooks";
import {PasswordInput, SubmitButton} from "#src/shared/ui";
import {Input, Link} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {signUp} from "../actions";
import {SIGNUP_VALIDATION_SCHEMA} from "../constants";
import {SignupFormFields} from "../types";

const SignupForm = () => {
	const router = useRouter();
	const {formAction, error, fieldErrors} = useFormAction<SignupFormFields>(
		signUp,
		{
			onSuccess: () => {
				router.push(Pathname.LOGIN);
			},
			validationSchema: SIGNUP_VALIDATION_SCHEMA
		}
	);

	return (
		<div className="max-w-[325px] w-full">
			<h1 className="text-5xl mb-6">Signup</h1>
			{error ? (
				<div className="mb-4 text-danger">
					<p>{error}</p>
				</div>
			) : null}
			<form className="mb-2" action={formAction}>
				<div className="flex flex-col gap-4 mb-6">
					<Input
						label="Username"
						placeholder="Enter your username"
						name="username"
						isInvalid={"username" in fieldErrors}
						errorMessage={fieldErrors?.username?.[0]}
					/>
					<Input
						label="Email"
						placeholder="Enter your email"
						name="email"
						type="email"
						isInvalid={"email" in fieldErrors}
						errorMessage={fieldErrors?.email?.[0]}
					/>
					<PasswordInput
						name="password"
						isInvalid={"password" in fieldErrors}
						errorMessage={fieldErrors?.password?.[0]}
					/>
					<PasswordInput
						label="Confirm Password"
						placeholder="Confirm your password"
						name="confirmPassword"
						isInvalid={"confirmPassword" in fieldErrors}
						errorMessage={fieldErrors?.confirmPassword?.[0]}
					/>
				</div>
				<SubmitButton>Sign Up</SubmitButton>
			</form>
			<p className="text-small">
				Already have an account?{" "}
				<Link href={Pathname.LOGIN} size="sm">
					Login
				</Link>
			</p>
		</div>
	);
};

export default SignupForm;
