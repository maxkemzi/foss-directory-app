import {DocumentObject} from "../types";

interface DocumentImpl<T extends DocumentObject> {
	toObject(): T;
}

export type {DocumentImpl};
