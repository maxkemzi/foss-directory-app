import {UserModel} from "#src/db/models";

class AccountService {
	static async delete(userId: number) {
		await UserModel.deleteById(userId);
	}
}

export default AccountService;
