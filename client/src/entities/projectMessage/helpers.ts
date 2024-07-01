import {ProjectMessageFromApi} from "#src/shared/apis";
import {SessionFromApi} from "foss-directory-shared";
import {ExtendedProjectMessage} from "./types";

const isOwn = (
	message: ProjectMessageFromApi,
	userId: SessionFromApi["user"]["id"]
) => {
	if (message.type !== "regular" || message.sender === null) {
		return false;
	}

	return message.sender.user.id === userId;
};

const extend = (
	message: ProjectMessageFromApi,
	userId: SessionFromApi["user"]["id"]
): ExtendedProjectMessage => {
	return {...message, isOwn: isOwn(message, userId)};
};

export {extend};
