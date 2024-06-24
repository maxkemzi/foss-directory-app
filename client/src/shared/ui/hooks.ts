"use client";

import {
	DependencyList,
	EffectCallback,
	RefObject,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef
} from "react";

const useEffectUpdateOnly = (
	cb: EffectCallback,
	deps: DependencyList,
	useLayout?: boolean
) => {
	const isFirstRender = useRef(true);
	const effectHook = useLayout ? useLayoutEffect : useEffect;

	effectHook(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return undefined;
		}

		return cb();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};

const useListenClickOutside = (
	ref: RefObject<HTMLElement>,
	onClickOutside: () => void
) => {
	useEffect(() => {
		const handleClickOutside = ({target}: MouseEvent): void => {
			const targetIsTheRefElement =
				ref.current && ref.current.contains(target as Node);
			if (targetIsTheRefElement) {
				return;
			}

			onClickOutside();
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [ref, onClickOutside]);
};

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

const useCallbackWithDebounce = <Cb extends (...args: any[]) => void>(
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

	const callbackWithDebounce = useCallback(
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

	return callbackWithDebounce;
};

export {
	useEffectUpdateOnly,
	useListenClickOutside,
	useObserver,
	useCallbackWithDebounce
};
