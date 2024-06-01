const formatCreatedAt = (createdAt: string) => {
	const date = new Date(createdAt);
	return new Intl.DateTimeFormat("en", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(date);
};

export default formatCreatedAt;
