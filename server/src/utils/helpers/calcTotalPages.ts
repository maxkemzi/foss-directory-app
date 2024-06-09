const calcTotalPages = (totalCount: number, limit: number) =>
	Math.ceil(totalCount / limit);

export default calcTotalPages;
