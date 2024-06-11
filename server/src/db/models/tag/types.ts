interface FindAllOptions {
	search?: string;
	limit?: number;
	offset?: number;
}

interface CountAllOptions {
	search?: string;
}

export type {FindAllOptions, CountAllOptions};
