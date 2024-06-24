import {PopulatedProjectDocument, UserDocument} from "#src/db";

interface ExtendedProjectDocument extends PopulatedProjectDocument {
	memberCount: number;
	isRequestable: boolean;
}

interface ExtendedUserDocument extends UserDocument {
	githubIsConnected: boolean;
}

export type {ExtendedProjectDocument, ExtendedUserDocument};
