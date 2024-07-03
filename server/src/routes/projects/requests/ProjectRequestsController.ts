import {ErrorFactory} from "#src/lib";
import {calcOffset, setPaginationHeaders} from "#src/routes/helpers";
import {ProjectRequestService} from "#src/services";
import {
	AcceptByIdRequestHandler,
	CreateRequestHandler,
	GetReceivedParsedQuery,
	GetReceivedRequestHandler,
	RejectByIdRequestHandler
} from "./types";

class ProjectRequestsController {
	static create: CreateRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const {projectId, projectRoleId} = req.body;

			const request = await ProjectRequestService.create(
				{userId, projectId, projectRoleId},
				userId
			);

			res.json({id: request.id});
		} catch (e) {
			next(e);
		}
	};

	static getReceived: GetReceivedRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const {page, limit} = req.query as GetReceivedParsedQuery;

			const offset = calcOffset(page, limit);

			const {requests, totalCount} =
				await ProjectRequestService.getByReceiverUserId(userId, {
					limit,
					offset
				});

			setPaginationHeaders(res, {page, limit, totalCount});
			res.json(requests);
		} catch (e) {
			next(e);
		}
	};

	static acceptById: AcceptByIdRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const {id} = req.params;

			await ProjectRequestService.acceptById(id, userId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	};

	static rejectById: RejectByIdRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const {id} = req.params;

			await ProjectRequestService.rejectById(id, userId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	};
}

export default ProjectRequestsController;
