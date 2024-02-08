import {UserDocumentData, UserDocumentImpl, UserFromDb} from "./types";

class UserDocument implements UserDocumentImpl {
	id: UserFromDb["id"];
	username: UserFromDb["username"];
	email: UserFromDb["email"];
	password: UserFromDb["password"];
	githubIsConnected: UserFromDb["github_connected"];
	createdAt: UserFromDb["created_at"];
	updatedAt: UserFromDb["updated_at"];

	constructor(user: UserFromDb) {
		this.id = user.id;
		this.username = user.username;
		this.email = user.email;
		this.password = user.password;
		this.githubIsConnected = user.github_connected;
		this.createdAt = user.created_at;
		this.updatedAt = user.updated_at;
	}

	toObject(): UserDocumentData {
		return {
			id: this.id,
			username: this.username,
			email: this.email,
			password: this.password,
			githubIsConnected: this.githubIsConnected,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}

export default UserDocument;
