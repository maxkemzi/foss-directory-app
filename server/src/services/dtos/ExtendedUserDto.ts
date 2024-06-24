import {ExtendedUserDocument} from "../types";
import UserDto from "./UserDto";

class ExtendedUserDto extends UserDto {
	githubIsConnected: boolean;

	constructor(doc: ExtendedUserDocument) {
		super(doc);
		this.githubIsConnected = doc.githubIsConnected;
	}
}

export default ExtendedUserDto;
