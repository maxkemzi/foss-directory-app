import {RoleDocument} from "#src/db/types";

interface FindOptions {
	search?: string;
	limit?: number;
	offset?: number;
}

interface CountOptions {
	search?: string;
}

interface RoleModelImpl {
	findAll(opts?: FindOptions): Promise<RoleDocument[]>;
	countAll(opts?: CountOptions): Promise<number>;
	findByName(name: RoleDocument["name"]): Promise<RoleDocument | null>;
}

export type {CountOptions, FindOptions, RoleModelImpl};
