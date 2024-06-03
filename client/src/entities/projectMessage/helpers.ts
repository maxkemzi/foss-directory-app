const formatIsoDateString = (isoDate: string) => {
	const date = new Date(isoDate);
	return new Intl.DateTimeFormat("en", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(date);
};

export {formatIsoDateString};
