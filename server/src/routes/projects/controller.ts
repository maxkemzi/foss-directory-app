import {ApiError} from "#src/lib";
import {projectService} from "#src/services";
import {Header} from "#src/utils/constants";
import {NextFunction, Request, Response} from "express";

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

		const {search, limit, page} = req.query;

		const parsedLimit = limit ? parseInt(limit, 10) : 10;
		const parsedPage = page ? parseInt(page, 10) : 1;

		const offset = (parsedPage - 1) * parsedLimit;

		const {projects, totalCount} = await projectService.getAll({
			search,
			limit: parsedLimit,
			offset,
			userId
		});

		res.set({[Header.TOTAL_COUNT]: totalCount});
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

		const projects = await projectService.getByOwnerUserId(userId);

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

const getByUserMembership = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const projects = await projectService.getByMemberUserId(userId);

		res.json(projects);
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
	getByUserMembership
};
