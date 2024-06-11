"use client";

import {useRef, useEffect, useCallback} from "react";

const useDebouncedCallback = <Cb extends (...args: any[]) => void>(
	cb: Cb,
	delay = 500
) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Cleanup the previous timeout on re-render
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const debouncedCallback = useCallback(
		(...args: Parameters<Cb>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				cb(...args);
			}, delay);
		},
		[cb, delay]
	);

	return debouncedCallback;
};

export default useDebouncedCallback;
