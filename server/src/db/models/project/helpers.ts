const createSearchCondition = (search: string, columns: string[]) => {
	const searchStrings = columns.map(c => `${c} ILIKE '%${search}%'`);
	return `(${searchStrings.join(" OR ")})`;
};

export {createSearchCondition};
