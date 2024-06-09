interface FindAllOptions {
	search?: string;
	limit?: number;
	offset?: number;
}

interface CountAllOptions {
	search?: string;
}

interface FindByOwnerUserIdOptions {
	search?: string;
	limit?: number;
	offset?: number;
}

interface CountByOwnerUserIdOptions {
	search?: string;
}

interface FindByMemberUserIdOptions {
	search?: string;
	limit?: number;
	offset?: number;
}

interface CountByMemberUserIdOptions {
	search?: string;
}

export type {
	FindAllOptions,
	CountAllOptions,
	FindByOwnerUserIdOptions,
	CountByOwnerUserIdOptions,
	FindByMemberUserIdOptions,
	CountByMemberUserIdOptions
};
