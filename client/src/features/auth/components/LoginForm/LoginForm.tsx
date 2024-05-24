"use client";

import {Pathname} from "#src/shared/constants";
import {PasswordInput, SubmitButton} from "#src/shared/ui";
import {Input, Link} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useFormState} from "react-dom";
import {logInWithState} from "./actions";
import {INITIAL_FORM_STATE} from "./constants";

const LoginForm = () => {
	const router = useRouter();
	const [state, formAction] = useFormState(logInWithState, INITIAL_FORM_STATE);

	useEffect(() => {
		if (state.success) {
			router.push(Pathname.HOME);
		}
	}, [router, state.success]);

	return (
		<div className="max-w-[325px] w-full">
			<h1 className="text-5xl mb-6">Login</h1>
			{state?.error ? (
				<div className="mb-4 text-danger">
					<p>{state.error}</p>
				</div>
			) : null}
			<form className="mb-2" action={formAction}>
				<div className="flex flex-col gap-4 mb-6">
					<Input
						label="Email"
						placeholder="Enter your email"
						name="email"
						isInvalid={Object.hasOwn(state.fieldErrors, "email")}
						errorMessage={state.fieldErrors?.email?.[0]}
					/>
					<PasswordInput
						name="password"
						isInvalid={Object.hasOwn(state.fieldErrors, "password")}
						errorMessage={state.fieldErrors?.password?.[0]}
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
