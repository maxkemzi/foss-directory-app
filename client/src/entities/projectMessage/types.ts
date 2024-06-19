import {ProjectMessageFromApi} from "#src/shared/apis";

interface DateMessage {
	id: string;
	isoDate: string;
	type: "date";
}

type ExtendedProjectMessage = ProjectMessageFromApi & {isOwn: boolean};

export type {DateMessage, ExtendedProjectMessage};
