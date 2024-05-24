"use client";

import {Toast, ToastOptions} from "#src/shared/ui";
import {
	FC,
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";

const ToastContext = createContext<{
	showToast: (opts: ToastOptions) => void;
	closeToast: (opts: ToastOptions) => void;
}>({showToast: () => {}, closeToast: () => {}});

const ToastProvider: FC<PropsWithChildren> = ({children}) => {
	const [toast, setToast] = useState<ToastOptions | null>(null);
	const timeout = useRef<NodeJS.Timeout | null>(null);

	const showToast = useCallback(({variant, message}: ToastOptions) => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		setToast({variant, message});

		timeout.current = setTimeout(() => {
			setToast(null);
			timeout.current = null;
		}, 4000);
	}, []);

	const closeToast = useCallback(() => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		setToast(null);
		timeout.current = null;
	}, []);

	useEffect(() => {
		return () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		};
	}, []);

	const value = useMemo(
		() => ({showToast, closeToast}),
		[closeToast, showToast]
	);

	return (
		<ToastContext.Provider value={value}>
			{children}
			{toast ? (
				<div className="absolute top-4 right-4 z-[999]">
					<Toast
						variant={toast.variant}
						message={toast.message}
						onClose={closeToast}
					/>
				</div>
			) : null}
		</ToastContext.Provider>
	);
};

const useToast = () => useContext(ToastContext);

export default ToastProvider;
export {useToast};
