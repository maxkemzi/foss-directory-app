const createSearchCondition = (search: string, columns: string[]) => {
	const conditions = columns.map(c => `${c} ILIKE '%${search}%'`);
	return `(${conditions.join(" OR ")})`;
};

export {createSearchCondition};
