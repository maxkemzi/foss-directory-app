import {DependencyList, useEffect, useRef} from "react";

const useStateEffect = (cb: () => void, deps: DependencyList) => {
	const isIntialRender = useRef(true);

	useEffect(() => {
		if (isIntialRender.current) {
			isIntialRender.current = false;
			return;
		}

		cb();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps, cb]);
};

export default useStateEffect;
