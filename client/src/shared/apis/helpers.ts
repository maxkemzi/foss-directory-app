import {SearchParams} from "./types";

const parseNumericHeader = (value: string | null) => {
	if (value === null) {
		return null;
	}

	const parsedValue = Number(value);
	return !Number.isNaN(parsedValue) ? parsedValue : null;
};

const getUrlString = (url: string, opts: {params?: SearchParams} = {}) => {
	const {params} = opts;

	const result = new URL(url);

	if (params) {
		Object.entries(params).forEach(([name, value]) => {
			if (!value) {
				return;
			}

			const parsedValue = typeof value !== "string" ? String(value) : value;
			result.searchParams.set(name, parsedValue);
		});
	}

	return result.toString();
};

export {parseNumericHeader, getUrlString};
