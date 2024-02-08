import {CustomTagDocumentData} from "../customTag";
import {TagDocumentData} from "../tag";
import {UserDocumentData} from "../user";

interface ProjectFromDb {
	id: number;
	owner_id: number;
	name: string;
	description: string;
	repo_url: string;
	created_at: string;
	updated_at: string;
}

interface ProjectDocumentData {
	id: ProjectFromDb["id"];
	ownerId: ProjectFromDb["owner_id"];
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];
	createdAt: ProjectFromDb["created_at"];
	updatedAt: ProjectFromDb["updated_at"];
}

interface PopulatedProjectDocumentData extends ProjectDocumentData {
	Owner: UserDocumentData | null;
	Tags: TagDocumentData[];
	CustomTags: CustomTagDocumentData[];
}

interface ProjectDocumentImpl extends ProjectDocumentData {
	populate(): Promise<PopulatedProjectDocumentData>;
}

interface ProjectPayload {
	ownerId: number;
	name: string;
	description: string;
	repoUrl: string;
	tags: string[];
}

export type {
	PopulatedProjectDocumentData,
	ProjectDocumentData,
	ProjectDocumentImpl,
	ProjectFromDb,
	ProjectPayload
};
