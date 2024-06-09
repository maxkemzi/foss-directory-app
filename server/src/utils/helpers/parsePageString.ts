const parsePageString = (page: string | undefined, defaultPage: number = 1) =>
	page ? Number(page) : defaultPage;

export default parsePageString;
