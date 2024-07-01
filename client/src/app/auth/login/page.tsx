import {LoginForm} from "#src/features/auth";

const Login = () => {
	return (
		<main className="flex flex-grow">
			<section className="flex flex-col flex-grow items-center justify-center">
				<LoginForm />
			</section>
		</main>
	);
};

export default Login;
