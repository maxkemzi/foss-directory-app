import {UserFromDb} from "#src/types/db";
import {
	DocumentImpl,
	UserDocument as UserDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class UserDocument extends Document implements DocumentImpl<UserDocumentType> {
	username: UserDocumentType["username"];
	email: UserDocumentType["email"];
	password: UserDocumentType["password"];
	githubIsConnected: UserDocumentType["githubIsConnected"];

	constructor(user: UserFromDb) {
		super(user);
		this.username = user.username;
		this.email = user.email;
		this.password = user.password;
		this.githubIsConnected = user.github_connected;
	}

	toObject(): UserDocumentType {
		return {
			...super.toObject(),
			username: this.username,
			email: this.email,
			password: this.password,
			githubIsConnected: this.githubIsConnected
		};
	}
}

export default UserDocument;
