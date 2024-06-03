import {DependencyList, useEffect, useRef} from "react";

const useEffectUpdateOnly = (cb: () => void, deps: DependencyList) => {
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return undefined;
		}

		return cb();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};

export default useEffectUpdateOnly;
