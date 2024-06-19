import {UserDocument} from "#src/db";
import UserDto from "./UserDto";

class ExtendedUserDto extends UserDto {
	githubIsConnected: boolean;

	constructor(doc: UserDocument & {githubIsConnected: boolean}) {
		super(doc);
		this.githubIsConnected = doc.githubIsConnected;
	}
}

export default ExtendedUserDto;
