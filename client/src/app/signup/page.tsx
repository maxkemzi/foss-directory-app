import {signUp} from "./actions";

const Signup = () => {
	return (
		<main>
			<h1>Signup</h1>
			<form action={signUp}>
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
				<button type="submit">Sign up</button>
			</form>
		</main>
	);
};

export default Signup;
