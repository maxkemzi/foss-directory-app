"use client";

import {Input, InputProps} from "@nextui-org/react";
import {forwardRef, useState} from "react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "../icons";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(prev => !prev);

	return (
		<Input
			ref={ref}
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
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
