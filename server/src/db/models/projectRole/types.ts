import {
	ProjectDocument,
	ProjectRoleDocument,
	ProjectRolePayload,
	UserDocument
} from "#src/db/types";

interface ProjectRoleModelImpl {
	insert(payload: ProjectRolePayload): Promise<ProjectRoleDocument>;
	findById(id: ProjectRoleDocument["id"]): Promise<ProjectRoleDocument | null>;
	findByProjectId(id: ProjectDocument["id"]): Promise<ProjectRoleDocument[]>;
	findByProjectAndUserIds(
		projectId: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<ProjectRoleDocument | null>;
}

export type {ProjectRoleModelImpl};
