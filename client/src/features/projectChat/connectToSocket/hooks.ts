"use client";

import {ProjectChatFromApi, ProjectChatMessageFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {useEffect, useState} from "react";
import {Socket, io} from "socket.io-client";

interface Options {
	session: Session;
	projectId: ProjectChatFromApi["projectId"];
	onChatMessage?: (message: ProjectChatMessageFromApi) => void;
}

const useProjectChatSocketConnection = (opts: Options) => {
	const {session, projectId, onChatMessage} = opts;
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL as string, {
			auth: {token: session.tokens.access},
			query: {projectId}
		});

		newSocket.on("chat message", message => {
			onChatMessage?.(message);
		});

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, [session, projectId, onChatMessage]);

	return {socket};
};

export {useProjectChatSocketConnection};
