const parseLimitString = (
	limit: string | undefined,
	defaultLimit: number = 10
) => (limit ? Number(limit) : defaultLimit);

export default parseLimitString;
