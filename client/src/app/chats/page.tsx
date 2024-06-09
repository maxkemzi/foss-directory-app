import {getProjectsByMembership} from "#src/entities/project";
import {Pathname} from "#src/shared/constants";
import {redirect} from "next/navigation";

const Chats = async () => {
	const projects = await getProjectsByMembership();

	const firstProject = projects[0];
	if (firstProject) {
		redirect(`${Pathname.CHATS}/${firstProject.id}`);
	}

	return <p>There are no chats</p>;
};

export default Chats;
