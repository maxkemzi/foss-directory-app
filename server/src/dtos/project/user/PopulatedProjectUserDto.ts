import {PopulatedProjectUserDocument} from "#src/types/db/documents";

type User = NonNullable<PopulatedProjectUserDocument["user"]>;
type Role = NonNullable<PopulatedProjectUserDocument["role"]>;

class PopulatedProjectUserDto {
	id: PopulatedProjectUserDocument["id"];
	user: {
		id: User["id"];
		username: User["username"];
		avatar: User["avatar"];
	};
	role: {
		id: Role["id"];
		name: Role["name"];
	};
	isOwner: PopulatedProjectUserDocument["isOwner"];

	constructor(doc: PopulatedProjectUserDocument) {
		this.id = doc.id;
		this.user = {
			id: doc.user.id,
			username: doc.user.username,
			avatar: doc.user.avatar
		};
		this.role = {id: doc.role.id, name: doc.role.name};
		this.isOwner = doc.isOwner;
	}
}

export default PopulatedProjectUserDto;
