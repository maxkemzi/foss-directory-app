import {PopulatedProjectMessageDocument} from "#src/types/db/documents";

type Sender = PopulatedProjectMessageDocument["sender"];

class PopulatedProjectMessageDto {
	id: PopulatedProjectMessageDocument["id"];
	sender: {
		id: Sender["id"];
		username: Sender["username"];
		avatar: Sender["avatar"];
		role: {
			id: Sender["role"]["id"];
			name: Sender["role"]["name"];
		};
		isOwner: Sender["isOwner"];
	};
	text: PopulatedProjectMessageDocument["text"];
	createdAt: PopulatedProjectMessageDocument["createdAt"];

	constructor(doc: PopulatedProjectMessageDocument) {
		this.id = doc.id;
		this.sender = {
			id: doc.sender.id,
			username: doc.sender.username,
			avatar: doc.sender.avatar,
			role: {id: doc.sender.role.id, name: doc.sender.role.name},
			isOwner: doc.sender.isOwner
		};
		this.text = doc.text;
		this.createdAt = doc.createdAt;
	}
}

export default PopulatedProjectMessageDto;
