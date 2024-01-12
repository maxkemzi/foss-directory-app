import {logIn} from "./actions";

const Login = () => {
	return (
		<main>
			<h1>Login</h1>
			<form action={logIn}>
				<label>
					Email Address
					<input name="email" type="email" placeholder="Email Address" />
				</label>
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label>
				<button type="submit">Log in</button>
			</form>
		</main>
	);
};

export default Login;
