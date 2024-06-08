import {PopulatedProjectDocument} from "#src/db";

type OwnerUser = PopulatedProjectDocument["ownerUser"];

class ProjectChatDto {
	projectId: PopulatedProjectDocument["id"];
	name: PopulatedProjectDocument["name"];
	ownerUser: {id: OwnerUser["id"]};
	memberCount: number;

	constructor(data: PopulatedProjectDocument & {memberCount: number}) {
		this.projectId = data.id;
		this.name = data.name;
		this.ownerUser = {id: data.ownerUser.id};
		this.memberCount = data.memberCount;
	}
}

export default ProjectChatDto;
