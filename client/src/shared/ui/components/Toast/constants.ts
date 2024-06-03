import {ToastVariant as ToastVariantType} from "./types";

const ToastVariant: {[key in Uppercase<ToastVariantType>]: ToastVariantType} = {
	SUCCESS: "success",
	ERROR: "error",
	WARNING: "warning"
};

export {ToastVariant};
