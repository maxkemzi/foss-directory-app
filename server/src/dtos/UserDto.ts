import {User} from "#src/db/models";

class UserDto {
	id: number;
	username: string;
	email: string;
	githubIsConnected: boolean;

	constructor(model: User) {
		this.id = model.id;
		this.username = model.username;
		this.email = model.email;
		this.githubIsConnected = model.github_connected;
	}
}

export default UserDto;
