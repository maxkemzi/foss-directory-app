import {ApiError} from "#src/lib";
import {NextFunction, Request, Response} from "express";
import {ValidationChain, validationResult} from "express-validator";

const validator =
	(validationChain: ValidationChain[]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			for (let i = 0; i < validationChain.length; i += 1) {
				const validationRule = validationChain[i];
				// eslint-disable-next-line no-await-in-loop
				const result = await validationRule.run(req);
				if (!result.isEmpty()) {
					break;
				}
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new ApiError(400, JSON.stringify(errors.array()));
			}

			next();
		} catch (e) {
			next(e);
		}
	};

export default validator;
