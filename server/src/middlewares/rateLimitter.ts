import {Db, RateLimitDocument, RateLimitModel} from "#src/db";
import {ErrorFactory} from "#src/lib";
import {Request, Response, NextFunction} from "express";
import {ApiErrorInfo, ApiHeader, ApiRateLimit} from "foss-directory-shared";

const SECONDS_TO_RESET_IN = 60 * 60;

const setRateLimitHeaders = (
	res: Response,
	values: {maxRequests: number; rateLimit: RateLimitDocument}
) => {
	const {maxRequests, rateLimit} = values;

	res.set({
		[ApiHeader.RATE_LIMIT_LIMIT]: maxRequests,
		[ApiHeader.RATE_LIMIT_REMAINING]: maxRequests - rateLimit.requestCount,
		[ApiHeader.RATE_LIMIT_USED]: rateLimit.requestCount,
		[ApiHeader.RATE_LIMIT_RESET]: rateLimit.resetTime
	});
};

const rateLimitter = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = res.locals.user?.id;
	const {ip} = req;

	if (!userId && !ip) {
		return next(
			ErrorFactory.getBadRequest(ApiErrorInfo.RATE_LIMIT_NOT_ENOUGH_INFO)
		);
	}

	const client = await Db.getClient();
	const model = new RateLimitModel(client);
	const currentTimeInSec = Math.floor(Date.now() / 1000);

	const isAuth = !!userId;
	const maxRequests = isAuth ? ApiRateLimit.AUTH : ApiRateLimit.UNAUTH;

	try {
		let rateLimit: RateLimitDocument | null = null;

		if (userId) {
			rateLimit = await model.findByUserId(userId);
			if (!rateLimit) {
				rateLimit = await model.insert({
					userId,
					requestCount: 1,
					resetTime: currentTimeInSec + SECONDS_TO_RESET_IN
				});
				setRateLimitHeaders(res, {maxRequests, rateLimit});
				client.release();
				return next();
			}
		} else if (ip) {
			rateLimit = await model.findByIp(ip);
			if (!rateLimit) {
				rateLimit = await model.insert({
					ip,
					requestCount: 1,
					resetTime: currentTimeInSec + SECONDS_TO_RESET_IN
				});
				setRateLimitHeaders(res, {maxRequests, rateLimit});
				client.release();
				return next();
			}
		}

		// At this point rateLimit can't be undefined or null
		rateLimit = rateLimit as RateLimitDocument;
		const {id, requestCount, resetTime} = rateLimit;

		if (currentTimeInSec > resetTime) {
			rateLimit = await model.updateById(id, {
				requestCount: 1,
				resetTime: currentTimeInSec + SECONDS_TO_RESET_IN
			});
		} else if (requestCount < maxRequests) {
			rateLimit = await model.updateById(id, {
				requestCount: requestCount + 1
			});
		} else {
			setRateLimitHeaders(res, {maxRequests, rateLimit});
			client.release();
			return next(ErrorFactory.getTooManyRequests());
		}

		setRateLimitHeaders(res, {maxRequests, rateLimit});
		client.release();
		return next();
	} catch (e) {
		client.release();
		next(ErrorFactory.getInternalServer(ApiErrorInfo.INTERNAL_SERVER));
	}
};

export default rateLimitter;
