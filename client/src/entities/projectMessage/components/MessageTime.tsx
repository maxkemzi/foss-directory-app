"use client";

import {ProjectMessageFromApi} from "#src/shared/apis";
import {FC} from "react";

interface Props {
	createdAt: ProjectMessageFromApi["createdAt"];
}

const CLASS_NAMES = "text-sm text-foreground-400 truncate";

const MessageTime: FC<Props> = ({createdAt}) => {
	const time = new Intl.DateTimeFormat("en", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(new Date(createdAt));

	return (
		<time className={CLASS_NAMES} dateTime={time}>
			{time}
		</time>
	);
};

export default MessageTime;
