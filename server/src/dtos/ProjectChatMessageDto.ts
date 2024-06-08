import {PopulatedProjectMessageDocument} from "#src/db";

type Sender = NonNullable<PopulatedProjectMessageDocument["sender"]>;
type SenderRole = NonNullable<Sender["role"]>;

class ProjectChatMessageDto {
	id: PopulatedProjectMessageDocument["id"];
	sender: {
		user: {
			id: Sender["user"]["id"];
			username: Sender["user"]["username"];
			avatar: Sender["user"]["avatar"];
		};
		role: {
			id: SenderRole["id"];
			name: SenderRole["name"];
		} | null;
		isOwner: Sender["isOwner"];
	} | null;
	text: PopulatedProjectMessageDocument["text"];
	type: PopulatedProjectMessageDocument["type"];
	createdAt: PopulatedProjectMessageDocument["createdAt"];

	constructor(doc: PopulatedProjectMessageDocument) {
		this.id = doc.id;
		this.sender = doc.sender
			? {
					user: {
						id: doc.sender.user.id,
						username: doc.sender.user.username,
						avatar: doc.sender.user.avatar
					},
					role: doc.sender.role
						? {id: doc.sender.role.id, name: doc.sender.role.name}
						: null,
					isOwner: doc.sender.isOwner
				}
			: null;
		this.text = doc.text;
		this.type = doc.type;
		this.createdAt = doc.createdAt;
	}
}

export default ProjectChatMessageDto;
