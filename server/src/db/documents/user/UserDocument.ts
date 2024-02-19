import {User, UserFromDb} from "../../types";
import Document from "../Document";
import {DocumentImpl} from "../types";

class UserDocument extends Document implements DocumentImpl<User> {
	username: UserFromDb["username"];
	email: UserFromDb["email"];
	password: UserFromDb["password"];
	githubIsConnected: UserFromDb["github_connected"];

	constructor(user: UserFromDb) {
		super(user);
		this.username = user.username;
		this.email = user.email;
		this.password = user.password;
		this.githubIsConnected = user.github_connected;
	}

	toObject(): User {
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
