"use client";

import {Chip} from "@nextui-org/react";
import {FC, useEffect, useState} from "react";
import {ProjectDateMessage} from "../types";
import MessageContainer from "./MessageContainer";
import MessageText from "./MessageText";

interface Props {
	message: ProjectDateMessage;
}

const DateMessage: FC<Props> = ({message}) => {
	const {isoDate} = message;

	const [formattedDate, setFormattedDate] = useState<string | null>(null);

	useEffect(() => {
		const currDate = new Date();
		const date = new Date(isoDate);

		const options: Intl.DateTimeFormatOptions = {
			month: "long",
			day: "numeric"
		};

		if (currDate.getFullYear() !== date.getFullYear()) {
			options.year = "numeric";
		}

		setFormattedDate(new Intl.DateTimeFormat("en", options).format(date));
	}, [isoDate]);

	return (
		<MessageContainer>
			<div className="ml-auto mr-auto">
				<Chip size="lg">
					{formattedDate ? (
						<MessageText>
							<time dateTime={formattedDate}>{formattedDate}</time>
						</MessageText>
					) : (
						<MessageText>...</MessageText>
					)}
				</Chip>
			</div>
		</MessageContainer>
	);
};

export default DateMessage;
