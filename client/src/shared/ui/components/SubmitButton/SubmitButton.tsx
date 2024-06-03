"use client";

import {Button, ButtonProps} from "@nextui-org/react";
import {FC, PropsWithChildren} from "react";
import {useFormStatus} from "react-dom";

interface Props extends PropsWithChildren {
	color?: ButtonProps["color"];
}

const SubmitButton: FC<Props> = ({children, color = "primary"}) => {
	const {pending} = useFormStatus();

	return (
		<Button color={color} type="submit" isDisabled={pending}>
			{children}
		</Button>
	);
};

export default SubmitButton;
