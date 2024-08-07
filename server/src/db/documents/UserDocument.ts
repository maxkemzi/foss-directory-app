import {UserDocument as UserDocumentType, UserFromDb} from "../types";
import Document from "./Document";

class UserDocument extends Document<UserDocumentType> {
	username: UserDocumentType["username"];
	email: UserDocumentType["email"];
	password: UserDocumentType["password"];
	avatar: UserDocumentType["avatar"];

	constructor(user: UserFromDb) {
		super(user);
		this.username = user.username;
		this.email = user.email;
		this.password = user.password;
		this.avatar = user.avatar;
	}

	toObject(): UserDocumentType {
		return {
			...super.toObject(),
			username: this.username,
			email: this.email,
			password: this.password,
			avatar: this.avatar
		};
	}
}

export default UserDocument;
