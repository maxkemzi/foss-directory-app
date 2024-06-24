import {
	ProjectDocument,
	ProjectUserDocument,
	ProjectUserPayload,
	UserDocument
} from "#src/db/types";

interface FindOptions {
	limit?: number;
	offset?: number;
}

interface ProjectUserModelImpl {
	insert(payload: ProjectUserPayload): Promise<ProjectUserDocument>;

	findByProjectId(
		id: ProjectDocument["id"],
		opts?: FindOptions
	): Promise<ProjectUserDocument[]>;
	countByProjectId(id: ProjectDocument["id"]): Promise<number>;

	findByProjectAndUserIds(
		projectId: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<ProjectUserDocument | null>;

	deleteByProjectAndUserIds(
		projectId: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<void>;
}

export type {FindOptions, ProjectUserModelImpl};
