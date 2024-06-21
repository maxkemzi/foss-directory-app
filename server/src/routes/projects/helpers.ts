import {Variant} from "./types";

const isValidVariant = (variant: string | undefined): variant is Variant =>
	variant === "all" || variant === "owner" || variant === "member";

const parseVariant = (
	variant: string | undefined,
	defaultVariant: Variant = "all"
) => (isValidVariant(variant) ? variant : defaultVariant);

export {parseVariant};
