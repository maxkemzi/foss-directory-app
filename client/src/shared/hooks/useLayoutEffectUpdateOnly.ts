import {DependencyList, useLayoutEffect, useRef} from "react";

const useLayoutEffectUpdateOnly = (cb: () => void, deps: DependencyList) => {
	const isFirstRender = useRef(true);

	useLayoutEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return undefined;
		}

		return cb();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};

export default useLayoutEffectUpdateOnly;
