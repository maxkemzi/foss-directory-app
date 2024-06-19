"use client";

import {FC, ReactNode, Ref, useImperativeHandle, useMemo, useRef} from "react";
import {v4 as uuidv4} from "uuid";
import {DateMessage, ExtendedProjectMessage} from "../types";

interface ScrollRef {
	scrollToEnd: () => void;
}

interface Props {
	topSlot?: ReactNode;
	messages: ExtendedProjectMessage[];
	withStartDate?: boolean;
	scrollRef?: Ref<any>;
	children: (messages: (ExtendedProjectMessage | DateMessage)[]) => ReactNode;
}

const ProjectMessageList: FC<Props> = ({
	messages,
	topSlot,
	withStartDate,
	scrollRef,
	children
}) => {
	const lastElementRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(
		scrollRef,
		() => {
			return {
				scrollToEnd: () => {
					lastElementRef.current?.scrollIntoView({block: "end"});
				}
			};
		},
		[]
	);

	const messagesWithDates = useMemo(() => {
		const insertDateMessages = (
			arr: ExtendedProjectMessage[]
		): (ExtendedProjectMessage | DateMessage)[] => {
			const result = [];
			let lastDate;

			const areDifferentDates = (date1: Date, date2: Date) => {
				return (
					date1.getFullYear() !== date2.getFullYear() ||
					date1.getMonth() !== date2.getMonth() ||
					date1.getDate() !== date2.getDate()
				);
			};

			for (let i = arr.length - 1; i >= 0; i -= 1) {
				const message = arr[i];
				const currentDate = new Date(message.createdAt);

				if (!lastDate || areDifferentDates(lastDate, currentDate)) {
					lastDate = currentDate;

					const dateMessage: DateMessage = {
						id: uuidv4(),
						isoDate: message.createdAt,
						type: "date"
					};
					result.push(dateMessage);
				}

				result.push(message);
			}

			if (!withStartDate) {
				result.shift();
			}

			return result.reverse();
		};

		return insertDateMessages(messages);
	}, [withStartDate, messages]);

	return (
		<div className="flex flex-col-reverse overflow-y-auto">
			<div ref={lastElementRef} className="invisible" />
			<div className="flex flex-col-reverse gap-4 p-6">
				{children(messagesWithDates)}
			</div>
			{topSlot}
		</div>
	);
};

export type {ScrollRef as ProjectMessageScrollRef};
export default ProjectMessageList;
