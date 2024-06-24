import {
	PopulatedProjectDocument,
	ProjectUserModel,
	UserDocument,
	UserModel
} from "#src/db";
import {ExtendedProjectDocument} from "../types";
import Extender from "./Extender";

class ProjectExtender extends Extender<
	PopulatedProjectDocument,
	ExtendedProjectDocument
> {
	async extend(
		doc: PopulatedProjectDocument,
		userId: UserDocument["id"]
	): Promise<ExtendedProjectDocument> {
		const {id} = doc;

		const projectUserModel = new ProjectUserModel(this.client);
		const userModel = new UserModel(this.client);

		const [memberCount, isOwner, isMember] = await Promise.all([
			projectUserModel.countByProjectId(id),
			userModel.isProjectOwner(id, userId),
			userModel.isProjectMember(id, userId)
		]);

		return {...doc, memberCount, isRequestable: !isOwner && !isMember};
	}
}

export default ProjectExtender;
