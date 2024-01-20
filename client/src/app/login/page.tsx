"use client";

import {SubmitButton} from "#src/components";
import {Input} from "@nextui-org/react";
import {useFormState} from "react-dom";
import {logIn} from "./actions";

const initialState = {
	error: null,
	email: null,
	password: null
};

const Login = () => {
	const [state, formAction] = useFormState(logIn, initialState);

	return (
		<main className="flex flex-grow">
			<section className="flex flex-grow items-center justify-center">
				<div className="max-w-[325px] w-full">
					<h1 className="text-5xl mb-6">Login</h1>
					<form action={formAction}>
						{state?.error ? <span>{state.error}</span> : null}
						<div className="flex flex-col gap-4 mb-6">
							<Input name="email" type="email" label="Email" />
							<Input name="password" type="password" label="Password" />
						</div>
						<SubmitButton>Log In</SubmitButton>
					</form>
				</div>
			</section>
		</main>
	);
};

export default Login;
