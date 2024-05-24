import {SessionProvider, getServerSession} from "#src/shared/auth";
import {ModalProvider} from "#src/shared/modal";
import {ToastProvider} from "#src/shared/toast";
import {UiProvider} from "#src/shared/ui";
import {FC, PropsWithChildren} from "react";

const Providers: FC<PropsWithChildren> = async ({children}) => {
	const session = await getServerSession();

	return (
		<SessionProvider session={session}>
			<UiProvider>
				<ToastProvider>
					<ModalProvider>{children}</ModalProvider>
				</ToastProvider>
			</UiProvider>
		</SessionProvider>
	);
};

export default Providers;
