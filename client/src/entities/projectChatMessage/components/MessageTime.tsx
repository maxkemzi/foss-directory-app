"use client";

import {FC, useEffect, useState} from "react";
import {formatIsoDateString} from "../helpers";

interface Props {
	isoDateString: string;
}

const MessageTime: FC<Props> = ({isoDateString}) => {
	const [formattedTime, setFormattedTime] = useState<string | null>(null);

	useEffect(() => {
		setFormattedTime(formatIsoDateString(isoDateString));
	}, [isoDateString]);

	const classNames = "text-sm text-foreground-400 truncate";

	return formattedTime ? (
		<time className={classNames} dateTime={formattedTime}>
			{formattedTime}
		</time>
	) : (
		<p className={classNames}>...</p>
	);
};

export default MessageTime;
