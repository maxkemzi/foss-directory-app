"use client";

import {ProjectChatBody} from "#src/entities/project";
import {
	ProjectMessage,
	ProjectMessageScrollRef,
	projectMessageHelpers
} from "#src/entities/projectMessage";
import {FetchMoreButton} from "#src/features/fetchMore";
import {SendProjectMessageForm} from "#src/features/projectMessage/send";
import {useSocketConnection} from "#src/features/socket/connect";
import {ProjectFromApi, ProjectMessageFromApi} from "#src/shared/apis";
import {Session} from "#src/shared/auth";
import {useEffectUpdateOnly} from "#src/shared/ui";
import {Spinner} from "@nextui-org/react";
import dynamic from "next/dynamic";
import {FC, useCallback, useMemo, useRef, useState} from "react";

interface Props {
	messages: {
		data: ProjectMessageFromApi[];
		hasMore: boolean;
		isFetching: boolean;
		onFetchMore: () => void;
	};
	project: ProjectFromApi;
	session: Session;
}

const DynamicProjectMessageList = dynamic(
	() =>
		import("#src/entities/projectMessage").then(mod => mod.ProjectMessageList),
	{
		ssr: false,
		loading: () => (
			<div className="h-full flex justify-center items-center">
				<Spinner />
			</div>
		)
	}
);

const Body: FC<Props> = ({project, messages, session}) => {
	const scrollRef = useRef<ProjectMessageScrollRef>(null);
	const [newMessages, setNewMessages] = useState<ProjectMessageFromApi[]>([]);

	const {socket} = useSocketConnection({
		projectId: project.id,
		accessToken: session.tokens.access,
		onChatMessage: message => {
			setNewMessages(prev => [message, ...prev]);
		}
	});

	useEffectUpdateOnly(
		() => {
			scrollRef.current?.scrollToEnd();
		},
		[newMessages],
		true
	);

	const handleMessageSend = useCallback(
		(message: string) => {
			socket?.emit("chat message", {
				projectId: project.id,
				text: message,
				type: "regular"
			});
		},
		[project.id, socket]
	);

	const allExtendedMessages = useMemo(() => {
		return [...newMessages, ...messages.data].map(m =>
			projectMessageHelpers.extend(m, session.user.id)
		);
	}, [messages.data, newMessages, session.user.id]);

	return (
		<ProjectChatBody
			contentSlot={
				<DynamicProjectMessageList
					scrollRef={scrollRef}
					withStartDate={!messages.hasMore}
					messages={allExtendedMessages}
					topSlot={
						messages.hasMore ? (
							<FetchMoreButton
								className="mt-6"
								isFetching={messages.isFetching}
								onFetchMore={messages.onFetchMore}
							/>
						) : null
					}
				>
					{items => items.map(i => <ProjectMessage key={i.id} message={i} />)}
				</DynamicProjectMessageList>
			}
			bottomSlot={<SendProjectMessageForm onSend={handleMessageSend} />}
		/>
	);
};

export default Body;
