import {projectActions} from "#src/entities/project";
import {Pathname} from "#src/shared/constants";
import {redirect} from "next/navigation";

const Chats = async () => {
	const {data} = await projectActions.getByVariant("member");

	const firstProject = data[0];
	if (firstProject) {
		const path = `${Pathname.CHATS}/${firstProject.id}`;
		redirect(path);
	}

	return <p>There are no chats</p>;
};

export default Chats;
