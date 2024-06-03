"use client";

import {logIn} from "#src/shared/auth";
import {Pathname} from "#src/shared/constants";
import {useFormAction} from "#src/shared/hooks";
import {PasswordInput, SubmitButton} from "#src/shared/ui";
import {Input, Link} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {LOGIN_VALIDATION_SCHEMA} from "../constants";
import {LoginFormFields} from "../types";

const LoginForm = () => {
	const router = useRouter();
	const {formAction, error, fieldErrors} = useFormAction<LoginFormFields>(
		logIn,
		{
			onSuccess: () => {
				router.push(Pathname.HOME);
			},
			validationSchema: LOGIN_VALIDATION_SCHEMA
		}
	);

	return (
		<div className="max-w-[325px] w-full">
			<h1 className="text-5xl mb-6">Login</h1>
			{error ? (
				<div className="mb-4 text-danger">
					<p>{error}</p>
				</div>
			) : null}
			<form className="mb-2" action={formAction}>
				<div className="flex flex-col gap-4 mb-6">
					<Input
						label="Email"
						placeholder="Enter your email"
						name="email"
						isInvalid={"email" in fieldErrors}
						errorMessage={fieldErrors.email?.[0]}
					/>
					<PasswordInput
						name="password"
						isInvalid={"password" in fieldErrors}
						errorMessage={fieldErrors.password?.[0]}
					/>
				</div>
				<SubmitButton>Log In</SubmitButton>
			</form>
			<p className="text-small">
				Don&apos;t have an account?{" "}
				<Link href={Pathname.SIGNUP} size="sm">
					Signup
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
