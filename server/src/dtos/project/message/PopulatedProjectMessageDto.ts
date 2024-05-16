import {PopulatedProjectMessageDocument} from "#src/types/db/documents";

type User = NonNullable<PopulatedProjectMessageDocument["user"]>;

class PopulatedProjectMessageDto {
	id: PopulatedProjectMessageDocument["id"];
	user: {
		id: User["id"];
		username: User["username"];
		avatar: User["avatar"];
		role: {
			id: User["role"]["id"];
			name: User["role"]["name"];
		};
		isOwner: User["isOwner"];
	} | null;
	text: PopulatedProjectMessageDocument["text"];
	type: PopulatedProjectMessageDocument["type"];
	createdAt: PopulatedProjectMessageDocument["createdAt"];

	constructor(doc: PopulatedProjectMessageDocument) {
		this.id = doc.id;
		this.user = doc.user
			? {
					id: doc.user.id,
					username: doc.user.username,
					avatar: doc.user.avatar,
					role: {id: doc.user.role.id, name: doc.user.role.name},
					isOwner: doc.user.isOwner
				}
			: null;
		this.text = doc.text;
		this.type = doc.type;
		this.createdAt = doc.createdAt;
	}
}

export default PopulatedProjectMessageDto;
