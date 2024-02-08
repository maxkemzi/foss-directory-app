interface UserFromDb {
	id: number;
	username: string;
	email: string;
	password: string;
	github_connected: boolean;
	created_at: string;
	updated_at: string;
}

interface UserDocumentData {
	id: UserFromDb["id"];
	username: UserFromDb["username"];
	email: UserFromDb["email"];
	password: UserFromDb["password"];
	githubIsConnected: UserFromDb["github_connected"];
	createdAt: UserFromDb["created_at"];
	updatedAt: UserFromDb["updated_at"];
}

interface UserDocumentImpl extends UserDocumentData {}

interface UserPayload {
	username: string;
	email: string;
	password: string;
}

export type {UserFromDb, UserDocumentData, UserDocumentImpl, UserPayload};
