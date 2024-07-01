"use client";

import {Pathname} from "#src/shared/constants";
import {useSafeAction} from "#src/shared/hooks";
import {PasswordInput} from "#src/shared/ui";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Input, Link} from "@nextui-org/react";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {safeSignUp} from "../actions";
import {SIGNUP_VALIDATION_SCHEMA} from "../constants";

type FormValues = z.infer<typeof SIGNUP_VALIDATION_SCHEMA>;

const SignupForm = () => {
	const [stepIsVeification, setStepIsVerification] = useState(false);

	const {
		control,
		handleSubmit,
		formState: {errors}
	} = useForm<FormValues>({
		resolver: zodResolver(SIGNUP_VALIDATION_SCHEMA),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	const {execute, error, isPending} = useSafeAction(safeSignUp, {
		onSuccess: () => {
			setStepIsVerification(true);
		},
		onError: () => {
			setStepIsVerification(false);
		}
	});

	const onSubmit = (values: FormValues) => {
		execute(values);
	};

	const handleBackToSignup = () => setStepIsVerification(false);

	return stepIsVeification ? (
		<div>
			<h1 className="text-5xl mb-4 capitalize">Email verification</h1>
			<p>We have send a verification URL to your email.</p>
			<p className="mb-4 color-danger">
				Please note that the verification URL is only valid for 24 hours.
			</p>
			<div className="flex gap-4">
				<Button color="primary" variant="flat" onClick={handleBackToSignup}>
					Back to signup
				</Button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Button color="primary" isDisabled={isPending} type="submit">
						Send again
					</Button>
				</form>
			</div>
		</div>
	) : (
		<div className="max-w-[325px] w-full">
			<h1 className="text-5xl mb-6">Signup</h1>
			{error ? (
				<div className="mb-4 text-danger">
					<p>{error}</p>
				</div>
			) : null}
			<form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-4 mb-6">
					<Controller
						name="username"
						control={control}
						render={({field}) => {
							return (
								<Input
									{...field}
									label="Username"
									placeholder="Enter your username"
									isInvalid={"username" in errors}
									errorMessage={errors.username?.message}
								/>
							);
						}}
					/>

					<Controller
						name="email"
						control={control}
						render={({field}) => {
							return (
								<Input
									{...field}
									label="Email"
									placeholder="Enter your email"
									type="email"
									isInvalid={"email" in errors}
									errorMessage={errors.email?.message}
								/>
							);
						}}
					/>

					<Controller
						name="password"
						control={control}
						render={({field}) => {
							return (
								<PasswordInput
									{...field}
									label="Password"
									placeholder="Enter your password"
									isInvalid={"password" in errors}
									errorMessage={errors.password?.message}
								/>
							);
						}}
					/>

					<Controller
						name="confirmPassword"
						control={control}
						render={({field}) => {
							return (
								<PasswordInput
									{...field}
									label="Confirm Password"
									placeholder="Confirm your password"
									isInvalid={"confirmPassword" in errors}
									errorMessage={errors.confirmPassword?.message}
								/>
							);
						}}
					/>
				</div>
				<Button color="primary" isDisabled={isPending} type="submit">
					Sign Up
				</Button>
			</form>
			<p className="text-small">
				Already have an account?{" "}
				<Link href={Pathname.LOGIN} size="sm">
					Login
				</Link>
			</p>
		</div>
	);
};

export default SignupForm;
