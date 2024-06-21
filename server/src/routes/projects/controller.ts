import {ApiError} from "#src/lib";
import {projectService} from "#src/services";
import {
	Header,
	calcOffset,
	calcTotalPages,
	parseLimitString,
	parsePageString,
	parseSearchString
} from "#src/utils";
import {NextFunction, Request, Response} from "express";
import {parseVariant} from "./helpers";
import {Variant} from "./types";

const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {name, description, tags, roles, repoUrl, role} = req.body;

		const project = await projectService.create({
			name,
			description,
			tags,
			roles,
			repoUrl,
			role,
			ownerUserId: userId
		});

		res.status(201).json(project);
	} catch (e) {
		next(e);
	}
};

const VARIANT_TO_SERVICE_FN_MAPPING: {
	[key in Variant]: (...args: any[]) => Promise<any>;
} = {
	all: projectService.getAll,
	owned: projectService.getByOwnerUserId,
	member: projectService.getByMemberUserId
};

const getAll = async (
	req: Request<{}, {}, {}, any>,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {variant, page, limit, search} = req.query;

		if (variant && typeof variant !== "string") {
			throw new ApiError(400, '"variant" param must be a string');
		}

		if (page && typeof page !== "string") {
			throw new ApiError(400, '"page" param must be a string');
		}

		if (limit && typeof limit !== "string") {
			throw new ApiError(400, '"limit" param must be a string');
		}

		if (search && typeof search !== "string") {
			throw new ApiError(400, '"search" param must be a string');
		}

		const parsedVariant = parseVariant(variant);
		const parsedPage = parsePageString(page);
		const parsedLimit = parseLimitString(limit);
		const parsedSearch = parseSearchString(search);

		const offset = calcOffset(parsedPage, parsedLimit);

		const serviceFn = VARIANT_TO_SERVICE_FN_MAPPING[parsedVariant];
		const {projects, totalCount} = await serviceFn(userId, {
			limit: parsedLimit,
			search: parsedSearch,
			offset
		});

		res.set({
			[Header.TOTAL_COUNT]: totalCount,
			[Header.PAGE]: parsedPage,
			[Header.PAGE_LIMIT]: parsedLimit,
			[Header.TOTAL_PAGES]: calcTotalPages(totalCount, parsedLimit)
		});
		res.json(projects);
	} catch (e) {
		next(e);
	}
};

const getOwned = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {page, limit, search} = req.query;

		if (page && typeof page !== "string") {
			throw new ApiError(400, '"page" param must be a string');
		}

		if (limit && typeof limit !== "string") {
			throw new ApiError(400, '"limit" param must be a string');
		}

		if (search && typeof search !== "string") {
			throw new ApiError(400, '"search" param must be a string');
		}

		const parsedPage = parsePageString(page);
		const parsedLimit = parseLimitString(limit);
		const parsedSearch = parseSearchString(search);

		const offset = calcOffset(parsedPage, parsedLimit);

		const {projects, totalCount} = await projectService.getByOwnerUserId(
			userId,
			{limit: parsedLimit, search: parsedSearch, offset}
		);

		res.set({
			[Header.TOTAL_COUNT]: totalCount,
			[Header.PAGE]: parsedPage,
			[Header.PAGE_LIMIT]: parsedLimit,
			[Header.TOTAL_PAGES]: calcTotalPages(totalCount, parsedLimit)
		});
		res.json(projects);
	} catch (e) {
		next(e);
	}
};

const getByMembership = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {page, limit, search} = req.query;

		if (page && typeof page !== "string") {
			throw new ApiError(400, '"page" param must be a string');
		}

		if (limit && typeof limit !== "string") {
			throw new ApiError(400, '"limit" param must be a string');
		}

		if (search && typeof search !== "string") {
			throw new ApiError(400, '"search" param must be a string');
		}

		const parsedPage = parsePageString(page);
		const parsedLimit = parseLimitString(limit);
		const parsedSearch = parseSearchString(search);

		const offset = calcOffset(parsedPage, parsedLimit);

		const {projects, totalCount} = await projectService.getByMemberUserId(
			userId,
			{limit: parsedLimit, search: parsedSearch, offset}
		);

		res.set({
			[Header.TOTAL_COUNT]: totalCount,
			[Header.PAGE]: parsedPage,
			[Header.PAGE_LIMIT]: parsedLimit,
			[Header.TOTAL_PAGES]: calcTotalPages(totalCount, parsedLimit)
		});
		res.json(projects);
	} catch (e) {
		next(e);
	}
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {id} = req.params;

		await projectService.deleteById(id, userId);

		res.json({success: true});
	} catch (e) {
		next(e);
	}
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {id} = req.params;

		const project = await projectService.getById(id, userId);

		res.json(project);
	} catch (e) {
		next(e);
	}
};

const leaveById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {id} = req.params;

		await projectService.leaveById(id, userId);

		res.json({success: true});
	} catch (e) {
		next(e);
	}
};

export default {
	create,
	getAll,
	getOwned,
	deleteById,
	getById,
	leaveById,
	getByMembership
};
