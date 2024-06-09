const parseSearchString = (search: string | undefined) => {
	return search?.replace(/'/g, "''");
};

export default parseSearchString;
