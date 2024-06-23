const createSearchCondition = (search: string, columns: string[]) => {
	const conditions = columns.map(c => `${c} ILIKE '%${search}%'`);
	return `(${conditions.join(" OR ")})`;
};

const createSearchTagsCondition = (searchTags: string[]) => {
	const conditions = searchTags.map(
		(_, i) => `(COALESCE(t.name, pt.name) ILIKE $${i + 1})`
	);
	return `(${conditions.join(" OR ")})`;
};

export {createSearchCondition, createSearchTagsCondition};
