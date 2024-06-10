"use client";

import {Pathname} from "#src/shared/constants";
import {useAction} from "#src/shared/hooks";
import {PasswordInput} from "#src/shared/ui";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Input, Link} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {signUp} from "../actions";
import {SIGNUP_VALIDATION_SCHEMA} from "../constants";

type FormValues = z.infer<typeof SIGNUP_VALIDATION_SCHEMA>;

const SignupForm = () => {
	const router = useRouter();

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

	const {execute, error, isPending} = useAction(signUp, {
		onSuccess: () => {
			router.push(Pathname.LOGIN);
		}
	});

	const onSubmit = (values: FormValues) => {
		execute(values);
	};

	return (
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
