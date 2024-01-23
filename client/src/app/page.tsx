import {Link} from "@nextui-org/react";
import {Header} from "./(header)";
import {HeroSection} from "./(hero)";

const Home = () => (
	<>
		<Header isAbsolute />
		<main>
			<HeroSection />
			<Link href="?modal-visible=true&modal-variant=github">Open modal</Link>
		</main>
	</>
);

export default Home;
