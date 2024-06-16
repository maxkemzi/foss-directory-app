"use client";

import {ProjectMessageFromApi} from "#src/shared/apis";
import {Session} from "#src/shared/auth";
import {AppError} from "#src/shared/error";
import {Spinner} from "@nextui-org/react";
import dynamic from "next/dynamic";
import {
	FC,
	ReactNode,
	Ref,
	forwardRef,
	useImperativeHandle,
	useMemo,
	useRef
} from "react";
import {v4 as uuidv4} from "uuid";
import {ProjectDateMessage} from "../types";
import {ProjectMessageProps} from "./ProjectMessage";

interface ListRef {
	scrollToEnd: () => void;
}

interface Props {
	topSlot?: ReactNode;
	messages: ProjectMessageFromApi[];
	session: Session;
	withStartDate?: boolean;
	children: (messages: ProjectMessageProps[]) => ReactNode;
}

const ProjectMessageList = forwardRef<ListRef, Props>(
	({messages, topSlot, withStartDate, children, session}, ref) => {
		if (!session) {
			throw new AppError("ProjectMessageList component requires session prop");
		}

		const lastElementRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(
			ref,
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
				arr: ProjectMessageFromApi[]
			): (ProjectMessageFromApi | ProjectDateMessage)[] => {
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

						const dateMessage: ProjectDateMessage = {
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

		const projectMessages = useMemo<ProjectMessageProps[]>(() => {
			const isMine = (message: ProjectMessageFromApi | ProjectDateMessage) => {
				if (
					message.type === "date" ||
					message.sender === null ||
					session === null
				) {
					return false;
				}

				return message.sender.user.id === session.user.id;
			};

			const isSequential = (
				message: ProjectMessageFromApi | ProjectDateMessage,
				prevMessage: ProjectMessageFromApi | ProjectDateMessage
			) => {
				if (
					message.type !== "regular" ||
					prevMessage.type !== "regular" ||
					message.sender === null ||
					prevMessage.sender === null
				) {
					return false;
				}

				return prevMessage.sender.user.id === message.sender.user.id;
			};

			return messagesWithDates.map((message, index, arr) => {
				const prevMessage = arr[index + 1];

				return {
					message,
					isMine: isMine(message),
					isSequential: prevMessage ? isSequential(message, prevMessage) : false
				};
			});
		}, [messagesWithDates, session]);

		return (
			<div className="flex flex-col-reverse overflow-y-auto">
				<div ref={lastElementRef} className="invisible" />
				<div className="flex flex-col-reverse gap-4 p-6">
					{children(projectMessages)}
				</div>
				{topSlot}
			</div>
		);
	}
);
ProjectMessageList.displayName = "ProjectMessageList";

const WrappedProjectMessageList: FC<Props & {listRef?: Ref<ListRef>}> = ({
	listRef,
	...rest
}) => {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <ProjectMessageList ref={listRef} {...rest} />;
};

const DynamicProjectMessageList = dynamic(
	() => Promise.resolve(WrappedProjectMessageList),
	{
		ssr: false,
		loading: () => (
			<div className="h-full flex justify-center items-center">
				<Spinner />
			</div>
		)
	}
);

const ForwardedRefComponent = forwardRef<ListRef, Props>((props, ref) => {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <DynamicProjectMessageList listRef={ref} {...props} />;
});
ForwardedRefComponent.displayName = "ProjectMessageList";

export type {ListRef as ProjectMessageListRef};
export default ForwardedRefComponent;
