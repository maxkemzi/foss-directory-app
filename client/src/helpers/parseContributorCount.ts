const parseContributorCount = (count: number) =>
	count === 1 ? `${count} contributor` : `${count} contributors`;

export default parseContributorCount;
