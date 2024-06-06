import {PopulatedProjectDocument} from "#src/types/db/documents";

type OwnerUser = PopulatedProjectDocument["ownerUser"];

class ProjectChatDto {
	projectId: PopulatedProjectDocument["id"];
	name: PopulatedProjectDocument["name"];
	userCount: PopulatedProjectDocument["userCount"];
	ownerUser: {id: OwnerUser["id"]};

	constructor(doc: PopulatedProjectDocument) {
		this.projectId = doc.id;
		this.name = doc.name;
		this.userCount = doc.userCount;
		this.ownerUser = {id: doc.ownerUser.id};
	}
}

export default ProjectChatDto;
