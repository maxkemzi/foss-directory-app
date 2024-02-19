import {DocumentObject, ObjectFromDb} from "../types";

interface CustomTagFromDb extends ObjectFromDb {
	project_id: number;
	name: string;
}

interface CustomTag extends DocumentObject {
	projectId: number;
	name: string;
}

export type {CustomTag, CustomTagFromDb};
