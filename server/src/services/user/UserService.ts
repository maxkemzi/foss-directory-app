import {Db, UserDocument, UserModel} from "#src/db";
import {ApiError} from "#src/lib";

class UserService {
	static async deleteById(id: UserDocument["id"]) {
		const client = await Db.getClient();

		const model = new UserModel(client);

		try {
			const candidate = await model.findById(id);
			if (!candidate) {
				throw new ApiError(400, "User with the specified id was not found");
			}

			await model.deleteById(id);
		} finally {
			client.release();
		}
	}
}

export default UserService;
