import {UserModel} from "#src/db/models";

class UsersService {
	static async deleteAccount(userId: number) {
		await UserModel.deleteById(userId);
	}
}

export default UsersService;
