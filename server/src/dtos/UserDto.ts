import {UserDocument} from "#src/types/db/documents";

class UserDto {
	id: UserDocument["id"];
	username: UserDocument["username"];
	email: UserDocument["email"];
	githubIsConnected: UserDocument["githubIsConnected"];

	constructor(doc: UserDocument) {
		this.id = doc.id;
		this.username = doc.username;
		this.email = doc.email;
		this.githubIsConnected = doc.githubIsConnected;
	}
}

export default UserDto;
