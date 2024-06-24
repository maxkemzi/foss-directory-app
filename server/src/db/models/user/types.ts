import {
	ProjectDocument,
	ProjectRequestDocument,
	UserDocument,
	UserPayload
} from "#src/db/types";

interface UserModelImpl {
	insert(payload: UserPayload): Promise<UserDocument>;
	findById(id: UserDocument["id"]): Promise<UserDocument | null>;

	findByUsername(
		username: UserDocument["username"]
	): Promise<UserDocument | null>;

	findByEmail(email: UserDocument["email"]): Promise<UserDocument | null>;
	deleteById(id: UserDocument["id"]): Promise<void>;

	isProjectOwner(
		projectId: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<boolean>;

	isProjectMember(
		projectId: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<boolean>;

	isProjectRequestReceiver(
		projectRequestId: ProjectRequestDocument["id"],
		userId: UserDocument["id"]
	): Promise<boolean>;

	isConnectedToGithub(userId: UserDocument["id"]): Promise<boolean>;
}

export type {UserModelImpl};
