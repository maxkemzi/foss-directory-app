import {TagDocument} from "#src/db/types";

interface FindOptions {
	search?: string;
	limit?: number;
	offset?: number;
}

interface CountOptions {
	search?: string;
}

interface TagModelImpl {
	findAll(opts?: FindOptions): Promise<TagDocument[]>;
	countAll(opts?: CountOptions): Promise<number>;
	findByName(name: TagDocument["name"]): Promise<TagDocument | null>;
}

export type {CountOptions, FindOptions, TagModelImpl};
