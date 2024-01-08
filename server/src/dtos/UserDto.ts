import {User} from "../db/models";

class UserDto {
	id: number;
	username: string;
	email: string;

	constructor(model: User) {
		this.id = model.id;
		this.username = model.username;
		this.email = model.email;
	}
}

export default UserDto;
