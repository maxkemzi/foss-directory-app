import {PopulatedProjectDocument} from "#src/types/db/documents";
import ProjectDto from "./ProjectDto";

type Owner = PopulatedProjectDocument["Owner"];
type ProjectTag = PopulatedProjectDocument["ProjectTags"][number];
type ProjectRole = PopulatedProjectDocument["ProjectRoles"][number];

class PopulatedProjectDto extends ProjectDto {
	Owner: {id: Owner["id"]; username: Owner["username"]};
	ProjectTags: {
		id: ProjectTag["id"];
		Tag: {id: ProjectTag["Tag"]["id"]; name: ProjectTag["Tag"]["name"]};
	}[];
	ProjectRoles: {
		id: ProjectRole["id"];
		Role: {name: ProjectRole["Role"]["name"]};
		count: ProjectRole["count"];
	}[];

	constructor(doc: PopulatedProjectDocument) {
		super(doc);
		this.Owner = {id: doc.Owner.id, username: doc.Owner.username};
		this.ProjectTags = doc.ProjectTags.map(pt => ({
			id: pt.id,
			Tag: {id: pt.Tag.id, name: pt.Tag.name}
		}));
		this.ProjectRoles = doc.ProjectRoles.map(pr => ({
			id: pr.id,
			count: pr.count,
			Role: {name: pr.Role.name}
		}));
	}
}

export default PopulatedProjectDto;
