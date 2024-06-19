import {PopulatedProjectDocument} from "#src/db";
import ProjectDto from "./ProjectDto";

class ExtendedProjectDto extends ProjectDto {
	memberCount: number;
	isRequestable: boolean;

	constructor(
		data: PopulatedProjectDocument & {
			memberCount: number;
			isRequestable: boolean;
		}
	) {
		super(data);
		this.memberCount = data.memberCount;
		this.isRequestable = data.isRequestable;
	}
}

export default ExtendedProjectDto;
