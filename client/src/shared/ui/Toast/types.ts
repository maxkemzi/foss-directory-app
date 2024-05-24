type ToastVariant = "success" | "error" | "warning";

interface ToastOptions {
	variant: ToastVariant;
	message: string;
}

export type {ToastOptions, ToastVariant};
