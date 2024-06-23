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

export type {FindOptions, CountOptions};
