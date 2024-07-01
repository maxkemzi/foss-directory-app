import {SignupForm} from "#src/features/auth";

const Signup = () => {
	return (
		<main className="flex flex-grow">
			<section className="flex flex-grow flex-col items-center justify-center">
				<SignupForm />
			</section>
		</main>
	);
};

export default Signup;
