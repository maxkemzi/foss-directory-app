"use client";

import {SubmitButton} from "#src/components";
import {PasswordInput} from "#src/components/ui";
import {Route} from "#src/constants";
import {Input, Link} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useFormState} from "react-dom";
import {signUp} from "./actions";
import {INITIAL_FORM_STATE} from "./constants";

const Signup = () => {
	const router = useRouter();
	const [state, formAction] = useFormState(signUp, INITIAL_FORM_STATE);

	useEffect(() => {
		if (state.success) {
			router.push(`${Route.HOME}?modal=github`);
		}
	}, [router, state.success]);

	return (
		<main className="flex flex-grow">
			<section className="flex flex-grow items-center justify-center">
				<div className="max-w-[325px] w-full">
					<h1 className="text-5xl mb-6">Signup</h1>
					{state?.error ? (
						<div className="mb-4 text-danger">
							<p>{state.error}</p>
						</div>
					) : null}
					<form className="mb-2" action={formAction}>
						<div className="flex flex-col gap-4 mb-6">
							<Input
								label="Username"
								placeholder="Enter your username"
								name="username"
								isInvalid={Object.hasOwn(state.fieldErrors, "username")}
								errorMessage={state.fieldErrors?.username?.[0]}
							/>
							<Input
								label="Email"
								placeholder="Enter your email"
								name="email"
								type="email"
								isInvalid={Object.hasOwn(state.fieldErrors, "email")}
								errorMessage={state.fieldErrors?.email?.[0]}
							/>
							<PasswordInput
								name="password"
								isInvalid={Object.hasOwn(state.fieldErrors, "password")}
								errorMessage={state.fieldErrors?.password?.[0]}
							/>
							<PasswordInput
								label="Confirm Password"
								placeholder="Confirm your password"
								name="confirmPassword"
								isInvalid={Object.hasOwn(state.fieldErrors, "confirmPassword")}
								errorMessage={state.fieldErrors?.confirmPassword?.[0]}
							/>
						</div>
						<SubmitButton>Sign Up</SubmitButton>
					</form>
					<p className="text-small">
						Already have an account?{" "}
						<Link href={Route.LOGIN} size="sm">
							Login
						</Link>
					</p>
				</div>
			</section>
		</main>
	);
};

export default Signup;
