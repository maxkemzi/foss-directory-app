import {getServerSession} from "#src/shared/auth";
import {FC} from "react";
import Navbar from "./Navbar/Navbar";

interface Props {
	isAbsolute?: boolean;
}

const Header: FC<Props> = async ({isAbsolute}) => {
	const session = await getServerSession();

	return <Navbar isAbsolute={isAbsolute} session={session} />;
};

export default Header;
