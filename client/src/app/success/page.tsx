import {Pathname} from "#src/constants";
import {Link} from "@nextui-org/react";

const Success = () => (
	<main>
		<h1>Successful operation!</h1>
		<Link href={Pathname.HOME}>Continue to the site</Link>
	</main>
);

export default Success;
