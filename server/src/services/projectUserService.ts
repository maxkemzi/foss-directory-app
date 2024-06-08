import {db, dbHelpers, projectUserModel, userModel} from "#src/db";
import {ProjectUserDto} from "#src/dtos";
import {ApiError} from "#src/lib";

const getByProjectId = async (id: string, userId: string) => {
	const client = await db.getClient();

	try {
		const isMember = await userModel.isProjectMember(client, {
			projectId: id,
			userId
		});
		if (!isMember) {
			throw new ApiError(403, "You are not the member of this project");
		}

		const users = await projectUserModel.findByProjectId(client, id);

		const populatedUsers = await dbHelpers.populateMany(client, users);

		return populatedUsers.map(pu => new ProjectUserDto(pu));
	} finally {
		client.release();
	}
};

export default {getByProjectId};
