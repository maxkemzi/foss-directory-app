import {Db, ProjectUserModel, ProjectUserPopulator, UserModel} from "#src/db";
import {ErrorFactory, ProjectError} from "#src/lib";
import {ProjectUserDto} from "../dtos";
import {GetOptions, GetReturn} from "./types";

class ProjectUserService {
	static async getByProjectId(
		id: string,
		userId: string,
		opts: GetOptions
	): Promise<GetReturn> {
		const {limit, offset} = opts;

		const client = await Db.getClient();
		const userModel = new UserModel(client);
		const projectUserModel = new ProjectUserModel(client);

		try {
			const isMember = await userModel.isProjectMember(id, userId);
			if (!isMember) {
				throw ErrorFactory.getForbidden(
					ProjectError.MEMBER_PERMISSION_REQUIRED
				);
			}

			const [users, totalCount] = await Promise.all([
				projectUserModel.findByProjectId(id, {limit, offset}),
				projectUserModel.countByProjectId(id)
			]);

			const populator = new ProjectUserPopulator(client);
			const populatedUsers = await populator.populateMany(users);

			return {
				users: populatedUsers.map(pu => new ProjectUserDto(pu)),
				totalCount
			};
		} finally {
			client.release();
		}
	}
}

export default ProjectUserService;
