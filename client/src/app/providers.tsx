import {getServerSession} from "#src/actions/auth";
import {SessionProvider, UiProvider} from "#src/providers";
import {FC, PropsWithChildren} from "react";

const Providers: FC<PropsWithChildren> = async ({children}) => {
	const session = await getServerSession();

	return (
		<SessionProvider session={session}>
			<UiProvider>{children}</UiProvider>
		</SessionProvider>
	);
};

export default Providers;
