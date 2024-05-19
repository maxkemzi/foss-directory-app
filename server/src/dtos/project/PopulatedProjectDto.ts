import {PopulatedProjectDocument} from "#src/types/db/documents";

type Owner = PopulatedProjectDocument["owner"];
type Tag = PopulatedProjectDocument["tags"][number];
type Role = PopulatedProjectDocument["roles"][number];

class PopulatedProjectDto {
	id: PopulatedProjectDocument["id"];
	name: PopulatedProjectDocument["name"];
	description: PopulatedProjectDocument["description"];
	repoUrl: PopulatedProjectDocument["repoUrl"];
	owner: {id: Owner["id"]; username: Owner["username"]};
	tags: {id: Tag["id"]; name: Tag["name"]}[];
	roles: {
		id: Role["id"];
		name: Role["name"];
		placesAvailable: Role["placesAvailable"];
	}[];
	contributorCount: PopulatedProjectDocument["contributorCount"];
	requestable: PopulatedProjectDocument["requestable"];

	constructor(doc: PopulatedProjectDocument) {
		this.id = doc.id;
		this.name = doc.name;
		this.description = doc.description;
		this.repoUrl = doc.repoUrl;
		this.owner = {id: doc.owner.id, username: doc.owner.username};
		this.tags = doc.tags.map(t => ({
			id: t.id,
			name: t.name
		}));
		this.roles = doc.roles.map(r => ({
			id: r.id,
			name: r.name,
			placesAvailable: r.placesAvailable
		}));
		this.contributorCount = doc.contributorCount;
		this.requestable = doc.requestable;
	}
}

export default PopulatedProjectDto;
