import {ProjectMessageFromApi} from "#src/shared/apis";
import {Session} from "#src/shared/auth";
import {ExtendedProjectMessage} from "./types";

const isOwn = (
	message: ProjectMessageFromApi,
	userId: Session["user"]["id"]
) => {
	if (message.type !== "regular" || message.sender === null) {
		return false;
	}

	return message.sender.user.id === userId;
};

const extend = (
	message: ProjectMessageFromApi,
	userId: Session["user"]["id"]
): ExtendedProjectMessage => {
	return {...message, isOwn: isOwn(message, userId)};
};

export {extend};
