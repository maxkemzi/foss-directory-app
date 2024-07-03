import {ErrorFactory} from "#src/lib";
import {ProjectService} from "#src/services";
import {calcOffset, setPaginationHeaders} from "../helpers";
import {
	CreateRequestHandler,
	DeleteByIdRequestHandler,
	GetAllParsedQuery,
	GetAllRequestHandler,
	GetByIdRequestHandler,
	LeaveByIdRequestHandler,
	Variant
} from "./types";

class ProjectsController {
	private static VARIANT_TO_SERVICE_FN_MAPPING: {
		[key in Variant]: (...args: any[]) => Promise<any>;
	} = {
		all: ProjectService.getAll,
		owner: ProjectService.getByOwnerUserId,
		member: ProjectService.getByMemberUserId
	};

	static create: CreateRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
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
	};

	static getAll: GetAllRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const {variant, page, limit, search, searchTags} =
				req.query as GetAllParsedQuery;

			const offset = calcOffset(page, limit);

			const serviceFn =
				ProjectsController.VARIANT_TO_SERVICE_FN_MAPPING[variant];
			const {projects, totalCount} = await serviceFn(userId, {
				limit,
				search,
				searchTags,
				offset
			});

			setPaginationHeaders(res, {page, limit, totalCount});
			res.json(projects);
		} catch (e) {
			next(e);
		}
	};

	static deleteById: DeleteByIdRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const {id} = req.params;

			await ProjectService.deleteById(id, userId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	};

	static getById: GetByIdRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const {id} = req.params;

			const project = await ProjectService.getById(id, userId);

			res.json(project);
		} catch (e) {
			next(e);
		}
	};

	static leaveById: LeaveByIdRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const {id} = req.params;

			await ProjectService.leaveById(id, userId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	};
}

export default ProjectsController;
