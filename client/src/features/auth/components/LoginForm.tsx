"use client";

import {Pathname} from "#src/shared/constants";
import {useSafeAction} from "#src/shared/hooks";
import {PasswordInput} from "#src/shared/ui";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Input, Link} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {safeLogIn} from "../actions";
import {LOGIN_VALIDATION_SCHEMA} from "../constants";

type FormValues = z.infer<typeof LOGIN_VALIDATION_SCHEMA>;

const LoginForm = () => {
	const router = useRouter();
	const {
		control,
		handleSubmit,
		formState: {errors}
	} = useForm<FormValues>({
		resolver: zodResolver(LOGIN_VALIDATION_SCHEMA),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const {execute, error, isPending} = useSafeAction(safeLogIn, {
		onSuccess: () => {
			router.push(Pathname.HOME);
		}
	});

	const onSubmit = (values: FormValues) => {
		execute(values);
	};

	return (
		<div className="max-w-[325px] w-full">
			<h1 className="text-5xl mb-6">Login</h1>
			{error ? (
				<div className="mb-4 text-danger">
					<p>{error}</p>
				</div>
			) : null}
			<form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-4 mb-6">
					<Controller
						name="email"
						control={control}
						render={({field}) => {
							return (
								<Input
									{...field}
									label="Email"
									placeholder="Enter your email"
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
				</div>
				<Button color="primary" isDisabled={isPending} type="submit">
					Log In
				</Button>
			</form>
			<p className="text-small">
				Don&apos;t have an account?{" "}
				<Link href={Pathname.SIGNUP} size="sm">
					Signup
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
