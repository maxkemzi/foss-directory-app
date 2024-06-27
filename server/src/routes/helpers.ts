const calcOffset = (page: number, limit: number) => (page - 1) * limit;

const calcTotalPages = (totalCount: number, limit: number) =>
	Math.ceil(totalCount / limit);

export {calcOffset, calcTotalPages};
