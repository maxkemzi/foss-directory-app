import {UserDocument, UserModel} from "#src/db";
import {ExtendedUserDocument} from "../types";
import Extender from "./Extender";

class UserExtender extends Extender<UserDocument, ExtendedUserDocument> {
	async extend(doc: UserDocument): Promise<ExtendedUserDocument> {
		const {id} = doc;

		const model = new UserModel(this.client);

		const githubIsConnected = await model.isConnectedToGithub(id);

		return {...doc, githubIsConnected};
	}
}

export default UserExtender;
