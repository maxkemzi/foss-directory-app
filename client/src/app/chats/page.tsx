import {getProjectChats} from "#src/entities/projectChat";
import {Pathname} from "#src/shared/constants";
import {redirect} from "next/navigation";

const Chats = async () => {
	const chats = await getProjectChats();

	const firstChat = chats[0];
	if (firstChat) {
		redirect(`${Pathname.CHATS}/${firstChat.projectId}`);
	}

	return <p>There are no chats</p>;
};

export default Chats;
