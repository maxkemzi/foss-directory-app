import {ErrorFactory} from "#src/lib";
import {NextFunction, Request, Response} from "express";
import {ValidationChain, validationResult} from "express-validator";

const validator =
	(...validations: ValidationChain[][]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		const flatValidations = validations.flat();

		try {
			for (let i = 0; i < flatValidations.length; i += 1) {
				const validation = flatValidations[i];
				// eslint-disable-next-line no-await-in-loop
				const result = await validation.run(req);
				if (!result.isEmpty()) {
					break;
				}
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw ErrorFactory.getValidation(errors.mapped());
			}

			next();
		} catch (e) {
			next(e);
		}
	};

export default validator;
