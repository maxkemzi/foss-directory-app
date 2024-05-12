import {UserModel} from "#src/db/models";

class UsersService {
	static async deleteAccount(userId: string) {
		await UserModel.deleteById(userId);
	}
}

export default UsersService;
