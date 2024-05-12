"use client";

import {Session} from "#src/types/actions/auth";
import React, {FC, PropsWithChildren, createContext, useContext} from "react";

const SessionContext = createContext<Session | null>(null);

interface Props extends PropsWithChildren {
	session: Session | null;
}

const SessionProvider: FC<Props> = ({session, children}) => {
	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	);
};

const useSession = () => useContext(SessionContext);

export {useSession};
export default SessionProvider;
