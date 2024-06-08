import {userModel, db} from "#src/db";
import {ApiError} from "#src/lib";

const deleteById = async (id: string) => {
	const client = await db.getClient();

	try {
		const candidate = await userModel.findById(client, id);
		if (!candidate) {
			throw new ApiError(400, "User with the specified id was not found");
		}

		await userModel.deleteById(client, id);
	} finally {
		client.release();
	}
};

export default {deleteById};
