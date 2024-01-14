import {useFormState} from "react-dom";
import SubmitButton from "./SubmitButton";
import {signUp} from "./actions";

const initialState = {
	error: null,
	email: null,
	password: null
};

const Signup = () => {
	const [state, formAction] = useFormState(signUp, initialState);

	return (
		<main>
			<h1>Signup</h1>
			<form action={formAction}>
				{state?.error ? <span>{state.error}</span> : null}
				<div>
					<label>
						Username
						<input name="username" type="text" placeholder="Username" />
					</label>
					<label>
						Email Address
						<input name="email" type="email" placeholder="Email Address" />
					</label>
					<label>
						Password
						<input name="password" type="password" placeholder="Password" />
					</label>
					<label>
						Confirm Password
						<input type="password" placeholder="Password" />
					</label>
				</div>
				<SubmitButton />
			</form>
		</main>
	);
};

export default Signup;
