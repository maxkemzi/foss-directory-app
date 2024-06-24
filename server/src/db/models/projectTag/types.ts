import {
	ProjectDocument,
	ProjectTagDocument,
	ProjectTagPayload
} from "#src/db/types";

interface ProjectTagModelImpl {
	insert(payload: ProjectTagPayload): Promise<ProjectTagDocument>;
	findByProjectId(id: ProjectDocument["id"]): Promise<ProjectTagDocument[]>;
}

export type {ProjectTagModelImpl};
