import {ErrorFactory} from "#src/lib";
import {UserService} from "#src/services";
import {DeleteAccountRequestHandler} from "./types";

class UsersController {
	static deleteAccount: DeleteAccountRequestHandler = async (
		req,
		res,
		next
	) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			await UserService.deleteById(userId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	};
}

export default UsersController;
