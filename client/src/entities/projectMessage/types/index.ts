import {ProjectMessageFromApi} from "#src/shared/api";

interface ProjectMessageCardProps {
	message: ProjectMessageFromApi;
	isMine: boolean;
	isSequential: boolean;
}

export type {ProjectMessageCardProps};
