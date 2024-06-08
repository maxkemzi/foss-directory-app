import {ProjectPayload} from "#src/db";

interface CreateProjectPayload extends ProjectPayload {
	role: string;
	tags: string[];
	roles: {[name: string]: number};
}

export type {CreateProjectPayload};
