import {Db, UserDocument, UserModel} from "#src/db";
import {ErrorFactory, UserError} from "#src/lib";

class UserService {
	static async deleteById(id: UserDocument["id"]) {
		const client = await Db.getClient();

		const model = new UserModel(client);

		try {
			const candidate = await model.findById(id);
			if (!candidate) {
				throw ErrorFactory.getBadRequest(UserError.NOT_FOUND);
			}

			await model.deleteById(id);
		} finally {
			client.release();
		}
	}
}

export default UserService;
