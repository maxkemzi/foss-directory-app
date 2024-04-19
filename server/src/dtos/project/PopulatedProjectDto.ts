import {PopulatedProject} from "#src/db/types";
import ProjectDto from "./ProjectDto";

class PopulatedProjectDto extends ProjectDto {
	Owner: {id: number; username: string} | null;
	Tags: {id: number; name: string}[];

	constructor(doc: PopulatedProject) {
		super(doc);
		this.Owner = doc.Owner
			? {id: doc.Owner.id, username: doc.Owner.username}
			: null;
		this.Tags = doc.Tags.map(t => ({id: t.id, name: t.name}));
	}
}

export default PopulatedProjectDto;
