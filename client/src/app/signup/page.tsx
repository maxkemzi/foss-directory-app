"use client";

import {useFormState} from "react-dom";
import {signUp} from "./actions";
import {Input} from "@nextui-org/input";
import {SubmitButton} from "#src/components";

const initialState = {
	error: null,
	email: null,
	password: null
};

const Signup = () => {
	const [state, formAction] = useFormState(signUp, initialState);

	return (
		<main className="flex flex-grow">
			<section className="flex flex-grow items-center justify-center">
				<div className="max-w-[325px] w-full">
					<h1 className="text-5xl mb-6">Signup</h1>
					<form action={formAction}>
						{state?.error ? <span>{state.error}</span> : null}
						<div className="flex flex-col gap-4 mb-6">
							<Input name="username" label="Username" />
							<Input name="email" type="email" label="Email" />
							<Input name="password" type="password" label="Password" />
							<Input type="password" label="Confirm Password" />
						</div>
						<SubmitButton>Sign Up</SubmitButton>
					</form>
				</div>
			</section>
		</main>
	);
};

export default Signup;
