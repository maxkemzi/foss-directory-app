import {PopulatedProjectDocument} from "#src/types/db/documents";

type OwnerUser = PopulatedProjectDocument["ownerUser"];
type Tag = PopulatedProjectDocument["tags"][number];
type Role = PopulatedProjectDocument["roles"][number];

class ProjectDto {
	id: PopulatedProjectDocument["id"];
	name: PopulatedProjectDocument["name"];
	description: PopulatedProjectDocument["description"];
	repoUrl: PopulatedProjectDocument["repoUrl"];
	ownerUser: {id: OwnerUser["id"]; username: OwnerUser["username"]};
	tags: {id: Tag["id"]; name: Tag["name"]}[];
	roles: {
		id: Role["id"];
		name: Role["name"];
		placesAvailable: Role["placesAvailable"];
	}[];
	userCount: PopulatedProjectDocument["userCount"];
	requestable: PopulatedProjectDocument["requestable"];

	constructor(doc: PopulatedProjectDocument) {
		this.id = doc.id;
		this.name = doc.name;
		this.description = doc.description;
		this.repoUrl = doc.repoUrl;
		this.ownerUser = {id: doc.ownerUser.id, username: doc.ownerUser.username};
		this.tags = doc.tags.map(t => ({
			id: t.id,
			name: t.name
		}));
		this.roles = doc.roles.map(r => ({
			id: r.id,
			name: r.name,
			placesAvailable: r.placesAvailable
		}));
		this.userCount = doc.userCount;
		this.requestable = doc.requestable;
	}
}

export default ProjectDto;
