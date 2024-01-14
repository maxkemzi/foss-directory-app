"use client";

import React from "react";
import {useFormStatus} from "react-dom";

const SubmitButton = () => {
	const {pending} = useFormStatus();

	return (
		<button type="submit" disabled={pending}>
			Log in
		</button>
	);
};

export default SubmitButton;
