import {
	ProjectRequestDocument,
	ProjectRequestPayload,
	UserDocument
} from "#src/db/types";

interface FindOptions {
	limit?: number;
	offset?: number;
}

interface ProjectRequestModelImpl {
	insert(payload: ProjectRequestPayload): Promise<ProjectRequestDocument>;

	deleteById(id: ProjectRequestDocument["id"]): Promise<void>;

	findById(
		id: ProjectRequestDocument["id"]
	): Promise<ProjectRequestDocument | null>;

	findByReceiverUserId(
		id: UserDocument["id"],
		opts?: FindOptions
	): Promise<ProjectRequestDocument[]>;
	countByReceiverUserId(id: UserDocument["id"]): Promise<number>;
}

export type {FindOptions, ProjectRequestModelImpl};
