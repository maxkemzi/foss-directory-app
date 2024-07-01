"use client";

import {SessionFromApi} from "foss-directory-shared";
import {FC, PropsWithChildren, createContext, useContext} from "react";

const SessionContext = createContext<SessionFromApi | null>(null);

interface Props extends PropsWithChildren {
	session: SessionFromApi | null;
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
