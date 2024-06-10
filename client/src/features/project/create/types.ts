import {z} from "zod";
import {VALIDATION_SCHEMA} from "./constants";

type FormValues = z.infer<typeof VALIDATION_SCHEMA>;

export type {FormValues};
