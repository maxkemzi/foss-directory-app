import {PopulatedProjectRequestDocument} from "#src/types/db/documents";

type Requestor = PopulatedProjectRequestDocument["Requestor"];
type ProjectRole = PopulatedProjectRequestDocument["ProjectRole"];

class PopulatedProjectRequestDto {
	id: PopulatedProjectRequestDocument["id"];
	requestorId: PopulatedProjectRequestDocument["requestorId"];
	projectRoleId: PopulatedProjectRequestDocument["projectRoleId"];
	Requestor: {id: Requestor["id"]; username: Requestor["username"]};
	ProjectRole: {
		id: ProjectRole["id"];
		Project: {
			id: ProjectRole["Project"]["id"];
			name: ProjectRole["Project"]["name"];
		};
		Role: {
			id: ProjectRole["Role"]["id"];
			name: ProjectRole["Role"]["name"];
		};
	};

	constructor(doc: PopulatedProjectRequestDocument) {
		this.id = doc.id;
		this.requestorId = doc.requestorId;
		this.projectRoleId = doc.projectRoleId;
		this.Requestor = {id: doc.Requestor.id, username: doc.Requestor.username};
		this.ProjectRole = {
			id: doc.ProjectRole.id,
			Project: {
				id: doc.ProjectRole.Project.id,
				name: doc.ProjectRole.Project.name
			},
			Role: {
				id: doc.ProjectRole.Role.id,
				name: doc.ProjectRole.Role.name
			}
		};
	}
}

export default PopulatedProjectRequestDto;
