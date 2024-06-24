import {ProjectDocument, ProjectPayload, UserDocument} from "#src/db/types";

interface FindOptions {
	search?: string;
	limit?: number;
	offset?: number;
	searchTags?: string[];
}

interface CountOptions {
	search?: string;
	searchTags?: string[];
}

interface ProjectModelImpl {
	insert(payload: ProjectPayload): Promise<ProjectDocument>;

	findAll(opts?: FindOptions): Promise<ProjectDocument[]>;
	countAll(opts?: CountOptions): Promise<number>;

	findByOwnerUserId(
		id: UserDocument["id"],
		opts?: FindOptions
	): Promise<ProjectDocument[]>;
	countByOwnerUserId(
		id: UserDocument["id"],
		opts?: CountOptions
	): Promise<number>;

	findByMemberUserId(
		id: UserDocument["id"],
		opts?: FindOptions
	): Promise<ProjectDocument[]>;
	countByMemberUserId(
		id: UserDocument["id"],
		opts?: CountOptions
	): Promise<number>;

	findById(id: ProjectDocument["id"]): Promise<ProjectDocument | null>;

	deleteById(id: ProjectDocument["id"]): Promise<void>;
}

export type {CountOptions, FindOptions, ProjectModelImpl};
