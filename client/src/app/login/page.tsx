"use client";

import {useFormState, useFormStatus} from "react-dom";
import {logIn} from "./actions";
import SubmitButton from "./SubmitButton";

const initialState = {
	error: null,
	email: null,
	password: null
};

const Login = () => {
	const [state, formAction] = useFormState(logIn, initialState);

	return (
		<main>
			<h1>Login</h1>
			<form action={formAction}>
				{state?.error ? <span>{state.error}</span> : null}
				<div>
					<label>
						Email Address
						<input name="email" type="email" placeholder="Email Address" />
					</label>
					<label>
						Password
						<input name="password" type="password" placeholder="Password" />
					</label>
				</div>
				<SubmitButton />
			</form>
		</main>
	);
};

export default Login;
