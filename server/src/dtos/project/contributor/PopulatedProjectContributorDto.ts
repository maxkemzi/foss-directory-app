import {PopulatedProjectContributorDocument} from "#src/types/db/documents";

type User = NonNullable<PopulatedProjectContributorDocument["user"]>;
type Role = NonNullable<PopulatedProjectContributorDocument["role"]>;

class PopulatedProjectContributorDto {
	id: PopulatedProjectContributorDocument["id"];
	user: {
		id: User["id"];
		username: User["username"];
		avatar: User["avatar"];
	};
	role: {
		id: Role["id"];
		name: Role["name"];
	};
	isOwner: PopulatedProjectContributorDocument["isOwner"];

	constructor(doc: PopulatedProjectContributorDocument) {
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

export default PopulatedProjectContributorDto;
