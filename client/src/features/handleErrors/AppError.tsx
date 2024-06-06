"use client";

import {useToast} from "#src/shared/toast";
import {ToastVariant} from "#src/shared/ui";
import {Button} from "@nextui-org/react";
import {useEffect} from "react";

const Error = ({
	error,
	reset
}: {
	error: Error & {digest?: string};
	reset: () => void;
}) => {
	const {showToast} = useToast();

	useEffect(() => {
		showToast({
			variant: ToastVariant.ERROR,
			message: error.message
		});
	}, [error, showToast]);

	return (
		<div className="p-4">
			<div>
				<p className="mb-2">Error: {error.message}</p>
				<Button onClick={reset}>Try again</Button>
			</div>
		</div>
	);
};

export default Error;
