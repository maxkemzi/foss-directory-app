"use client";

import formatCreatedAt from "#src/entities/projectMessage/helpers/formatCreatedAt";
import {FC, useEffect, useState} from "react";

interface Props {
	createdAt: string;
}

const CreatedAtTime: FC<Props> = ({createdAt}) => {
	const [formattedTime, setFormattedTime] = useState<string | null>(null);

	useEffect(() => {
		setFormattedTime(formatCreatedAt(createdAt));
	}, [createdAt]);

	const classNames = "text-sm text-foreground-400";

	return formattedTime ? (
		<time className={classNames} dateTime={formattedTime}>
			{formattedTime}
		</time>
	) : (
		<p className={classNames}>...</p>
	);
};

export default CreatedAtTime;
