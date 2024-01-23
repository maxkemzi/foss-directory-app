"use client";

import {useEffect} from "react";

const GlobalError = ({
	error,
	reset
}: {
	error: Error & {digest?: string};
	reset: () => void;
}) => {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<html lang="en" className="dark">
			<body>
				<main>
					<h2>Something went wrong!</h2>
					<button onClick={() => reset()} type="button">
						Try again
					</button>
				</main>
			</body>
		</html>
	);
};

export default GlobalError;
