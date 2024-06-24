import {
	ProjectDocument,
	ProjectMessageDocument,
	ProjectMessagePayload
} from "#src/db/types";

interface FindOptions {
	limit?: number;
	offset?: number;
}

interface ProjectMessageModelImpl {
	insert(payload: ProjectMessagePayload): Promise<ProjectMessageDocument>;

	findByProjectId(
		id: ProjectDocument["id"],
		opts?: FindOptions
	): Promise<ProjectMessageDocument[]>;
	countByProjectId(id: ProjectDocument["id"]): Promise<number>;

	findLatestByProjectId(
		id: ProjectDocument["id"]
	): Promise<ProjectMessageDocument | null>;

	findById(
		id: ProjectMessageDocument["id"]
	): Promise<ProjectMessageDocument | null>;
}

export type {FindOptions, ProjectMessageModelImpl};
