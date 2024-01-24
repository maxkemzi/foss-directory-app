"use client";

import {Input, InputProps} from "@nextui-org/react";
import {FC, useState} from "react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "../icons";

const PasswordInput: FC<InputProps> = props => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(prev => !prev);

	return (
		<Input
			label="Password"
			placeholder="Enter your password"
			endContent={
				<button
					className="focus:outline-none"
					type="button"
					onClick={toggleVisibility}
				>
					{isVisible ? (
						<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
					) : (
						<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
					)}
				</button>
			}
			type={isVisible ? "text" : "password"}
			{...props}
		/>
	);
};

export default PasswordInput;
