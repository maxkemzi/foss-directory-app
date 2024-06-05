const parseProjectUserCount = (count: number) =>
	count === 1 ? `${count} user` : `${count} users`;

export {parseProjectUserCount};
