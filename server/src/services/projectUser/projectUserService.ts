import {db, dbHelpers, projectUserModel, userModel} from "#src/db";
import {ProjectUserDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import {GetByProjectIdOptions, GetByProjectIdReturn} from "./types";

const getByProjectId = async (
	id: string,
	userId: string,
	opts: GetByProjectIdOptions
): Promise<GetByProjectIdReturn> => {
	const {limit, offset} = opts;

	const client = await db.getClient();

	try {
		const isMember = await userModel.isProjectMember(client, {
			projectId: id,
			userId
		});
		if (!isMember) {
			throw new ApiError(403, "You are not the member of this project");
		}

		const [users, totalCount] = await Promise.all([
			projectUserModel.findByProjectId(client, id, {limit, offset}),
			projectUserModel.countByProjectId(client, id)
		]);

		const populatedUsers = await dbHelpers.populateMany(client, users);

		return {
			users: populatedUsers.map(pu => new ProjectUserDto(pu)),
			totalCount
		};
	} finally {
		client.release();
	}
};

export default {getByProjectId};
