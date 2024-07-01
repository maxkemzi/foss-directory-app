import {AppError} from "../error";
import {ApiHeader} from "./constants";
import {SearchParams} from "./types";

const getPaginationHeaderValues = (headers: Headers) => {
	const totalCount = headers.get(ApiHeader.TOTAL_COUNT);
	if (!totalCount) {
		throw new AppError(`${ApiHeader.TOTAL_COUNT} header is missing`);
	}

	const page = headers.get(ApiHeader.PAGE);
	if (!page) {
		throw new AppError(`${ApiHeader.PAGE} header is missing`);
	}

	const limit = headers.get(ApiHeader.PAGE_LIMIT);
	if (!limit) {
		throw new AppError(`${ApiHeader.PAGE_LIMIT} header is missing`);
	}

	const totalPages = headers.get(ApiHeader.TOTAL_PAGES);
	if (!totalPages) {
		throw new AppError(`${ApiHeader.TOTAL_PAGES} header is missing`);
	}

	return {
		totalCount: Number(totalCount),
		page: Number(page),
		limit: Number(limit),
		totalPages: Number(totalPages)
	};
};

const getUrlString = (url: string, opts: {params?: SearchParams} = {}) => {
	const {params} = opts;

	const result = new URL(url);

	if (params) {
		Object.entries(params).forEach(([name, value]) => {
			if (!value) {
				return;
			}

			const parsedValue =
				typeof value !== "string" ? JSON.stringify(value) : value;
			result.searchParams.set(name, parsedValue);
		});
	}

	return result.toString();
};

const calcHasMore = (page: number, totalPages: number) => page < totalPages;

const getCookieValue = (name: string, cookies: string[]) => {
	const cookie = cookies.find(c => c.includes(`${name}=`));
	if (!cookie) {
		return null;
	}

	return cookie.split(";")[0].split("=")[1];
};

const decodeCookieValue = (value: string) => {
	try {
		return decodeURIComponent(value);
	} catch (e) {
		console.log("Error decoding cookie value.");
		return null;
	}
};

const parseCookieValue = <T>(decodedValue: string): T | null => {
	try {
		return JSON.parse(decodedValue);
	} catch (e) {
		console.log("Error parsing cookie value.");
		return null;
	}
};

export {
	getPaginationHeaderValues,
	getUrlString,
	calcHasMore,
	getCookieValue,
	decodeCookieValue,
	parseCookieValue
};
