import {UserDocument} from "#src/db";

class UserDto {
	id: UserDocument["id"];
	username: UserDocument["username"];
	email: UserDocument["email"];

	constructor(doc: UserDocument) {
		this.id = doc.id;
		this.username = doc.username;
		this.email = doc.email;
	}
}

export default UserDto;
