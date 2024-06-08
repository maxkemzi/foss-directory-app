const parseProjectMemberCount = (count: number) =>
	count === 1 ? `${count} member` : `${count} members`;

export {parseProjectMemberCount};
