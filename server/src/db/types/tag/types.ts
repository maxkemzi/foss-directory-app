import {DocumentObject, ObjectFromDb} from "../types";

interface TagFromDb extends ObjectFromDb {
	name: string;
}

interface Tag extends DocumentObject {
	name: string;
}

interface TagPayload {
	name: string;
}

export type {Tag, TagFromDb, TagPayload};
