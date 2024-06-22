interface FindOptions {
	search?: string;
	limit?: number;
	offset?: number;
}

interface CountOptions {
	search?: string;
}

export type {FindOptions, CountOptions};
