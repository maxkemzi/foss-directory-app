import {Db, UserDocument, UserModel} from "#src/db";
import {ErrorFactory} from "#src/lib";
import {ApiErrorInfo} from "foss-directory-shared";

class UserService {
	static async deleteById(id: UserDocument["id"]) {
		const client = await Db.getClient();

		const model = new UserModel(client);

		try {
			const candidate = await model.findById(id);
			if (!candidate) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.USER_NOT_FOUND);
			}

			await model.deleteById(id);
		} finally {
			client.release();
		}
	}
}

export default UserService;
