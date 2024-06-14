"use client";

import {ProjectFromApi, ProjectMessageFromApi} from "#src/shared/apis";
import {Session} from "#src/shared/auth";
import {useEffect, useRef, useState} from "react";
import {Socket, io} from "socket.io-client";

interface Options {
	accessToken: Session["tokens"]["access"];
	projectId: ProjectFromApi["id"];
	onChatMessage?: (message: ProjectMessageFromApi) => void;
}

const useSocketConnection = (opts: Options) => {
	const {accessToken, projectId, onChatMessage} = opts;

	const [socket, setSocket] = useState<Socket | null>(null);
	const onChatMessageRef = useRef(onChatMessage);

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL as string, {
			auth: {token: accessToken},
			query: {projectId}
		});

		newSocket.on("chat message", message => {
			onChatMessageRef.current?.(message);
		});

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, [accessToken, projectId]);

	return {socket};
};

export {useSocketConnection};
