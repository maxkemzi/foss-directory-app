import {User} from "#src/db/types";

class UserDto {
	id: number;
	username: string;
	email: string;
	githubIsConnected: boolean;

	constructor(doc: User) {
		this.id = doc.id;
		this.username = doc.username;
		this.email = doc.email;
		this.githubIsConnected = doc.githubIsConnected;
	}
}

export default UserDto;
