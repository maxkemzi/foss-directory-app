import {RefObject, useEffect, useRef} from "react";

type BaseOptions = {
	hasMore: boolean;
	isEnabled: boolean;
	onIntersect: () => void;
};

type OptionsWithRoot = BaseOptions & {
	rootRef: RefObject<any>;
	rootMargin: string;
};
type OptionsWithOptionalRoot = BaseOptions & {
	rootRef?: RefObject<any>;
	rootMargin?: never;
};

type Options = OptionsWithRoot | OptionsWithOptionalRoot;

const useObserver = (targetRef: RefObject<any>, opts: Options) => {
	const {hasMore, isEnabled, onIntersect, rootRef, rootMargin} = opts;

	const observerRef = useRef<IntersectionObserver | null>(null);
	const onIntersectRef = useRef(() => {});
	onIntersectRef.current = onIntersect;

	useEffect(() => {
		const targetNode = targetRef.current;

		if (!isEnabled || !targetNode || !hasMore) {
			return undefined;
		}

		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		const cb = (entries: IntersectionObserverEntry[]) => {
			if (entries[0].isIntersecting) {
				onIntersectRef.current();
			}
		};

		observerRef.current = new IntersectionObserver(cb, {
			root: rootRef?.current,
			rootMargin
		});
		observerRef.current.observe(targetNode);

		return () => {
			observerRef.current?.disconnect();
		};
	}, [hasMore, isEnabled, rootMargin, rootRef, targetRef]);
};

export default useObserver;
