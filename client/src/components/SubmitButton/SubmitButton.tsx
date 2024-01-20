"use client";

import {Button} from "@nextui-org/react";
import {FC, PropsWithChildren} from "react";
import {useFormStatus} from "react-dom";

const SubmitButton: FC<PropsWithChildren> = ({children}) => {
	const {pending} = useFormStatus();

	return (
		<Button color="primary" type="submit" isDisabled={pending}>
			{children}
		</Button>
	);
};

export default SubmitButton;
