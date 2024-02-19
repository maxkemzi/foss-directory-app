import {CustomTag} from "../customTag/types";
import {Tag} from "../tag/types";
import {DocumentObject, ObjectFromDb} from "../types";
import {User} from "../user/types";

interface ProjectFromDb extends ObjectFromDb {
	owner_id: number;
	name: string;
	description: string;
	repo_url: string;
}

interface Project extends DocumentObject {
	ownerId: ProjectFromDb["owner_id"];
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];
}

interface PopulatedProject extends Project {
	Owner: User | null;
	Tags: Tag[];
	CustomTags: CustomTag[];
}

interface ProjectPayload {
	ownerId: number;
	name: string;
	description: string;
	repoUrl: string;
	tags: string[];
}

export type {PopulatedProject, Project, ProjectFromDb, ProjectPayload};
