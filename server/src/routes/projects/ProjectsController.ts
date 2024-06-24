import {ApiError} from "#src/lib";
import {ProjectService} from "#src/services";
import {
	Header,
	calcOffset,
	calcTotalPages,
	parseLimitString,
	parsePageString,
	parseSearchString
} from "#src/utils";
import {NextFunction, Request, Response} from "express";
import {parseSearchTags, parseVariant} from "./helpers";
import {Variant} from "./types";

class ProjectsController {
	private static VARIANT_TO_SERVICE_FN_MAPPING: {
		[key in Variant]: (...args: any[]) => Promise<any>;
	} = {
		all: ProjectService.getAll,
		owned: ProjectService.getByOwnerUserId,
		member: ProjectService.getByMemberUserId
	};

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw new ApiError(401, "Unauthorized");
			}

			const {name, description, tags, roles, repoUrl, role} = req.body;

			const project = await ProjectService.create({
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
	}

	static async getAll(
		req: Request<{}, {}, {}, any>,
		res: Response,
		next: NextFunction
	) {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw new ApiError(401, "Unauthorized");
			}

			const {variant, page, limit, search, searchTags} = req.query;

			const parsedVariant = parseVariant(variant);
			const parsedPage = parsePageString(page);
			const parsedLimit = parseLimitString(limit);
			const parsedSearch = parseSearchString(search);
			const parsedSearchTags = parseSearchTags(searchTags);

			const offset = calcOffset(parsedPage, parsedLimit);

			const serviceFn =
				ProjectsController.VARIANT_TO_SERVICE_FN_MAPPING[parsedVariant];
			const {projects, totalCount} = await serviceFn(userId, {
				limit: parsedLimit,
				search: parsedSearch,
				searchTags: parsedSearchTags,
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
	}

	static async deleteById(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw new ApiError(401, "Unauthorized");
			}

			const {id} = req.params;

			await ProjectService.deleteById(id, userId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw new ApiError(401, "Unauthorized");
			}

			const {id} = req.params;

			const project = await ProjectService.getById(id, userId);

			res.json(project);
		} catch (e) {
			next(e);
		}
	}

	static async leaveById(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw new ApiError(401, "Unauthorized");
			}

			const {id} = req.params;

			await ProjectService.leaveById(id, userId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectsController;
