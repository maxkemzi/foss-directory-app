"use client";

import {ProjectFromApi, ProjectMessageFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {useEffect, useState} from "react";
import {Socket, io} from "socket.io-client";

interface Options {
	accessToken: Session["tokens"]["access"];
	projectId: ProjectFromApi["id"];
	onChatMessage?: (message: ProjectMessageFromApi) => void;
}

const useSocketConnection = (opts: Options) => {
	const {accessToken, projectId, onChatMessage} = opts;
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL as string, {
			auth: {token: accessToken},
			query: {projectId}
		});

		newSocket.on("chat message", message => {
			onChatMessage?.(message);
		});

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, [accessToken, projectId, onChatMessage]);

	return {socket};
};

export {useSocketConnection};
