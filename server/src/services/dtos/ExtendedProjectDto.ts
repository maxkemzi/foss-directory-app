import {ExtendedProjectDocument} from "../types";
import ProjectDto from "./ProjectDto";

class ExtendedProjectDto extends ProjectDto {
	memberCount: number;
	isRequestable: boolean;

	constructor(data: ExtendedProjectDocument) {
		super(data);
		this.memberCount = data.memberCount;
		this.isRequestable = data.isRequestable;
	}
}

export default ExtendedProjectDto;
