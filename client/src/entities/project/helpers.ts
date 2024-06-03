const parseProjectContributorCount = (count: number) =>
	count === 1 ? `${count} contributor` : `${count} contributors`;

export {parseProjectContributorCount};
