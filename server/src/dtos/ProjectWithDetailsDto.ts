import {PopulatedProjectDocument} from "#src/db";
import ProjectDto from "./ProjectDto";

class ProjectWithDetailsDto extends ProjectDto {
	memberCount: number;
	isOwner: boolean;
	isMember: boolean;

	constructor(
		data: PopulatedProjectDocument & {
			memberCount: number;
			isOwner: boolean;
			isMember: boolean;
		}
	) {
		super(data);
		this.memberCount = data.memberCount;
		this.isOwner = data.isOwner;
		this.isMember = data.isMember;
	}
}

export default ProjectWithDetailsDto;
