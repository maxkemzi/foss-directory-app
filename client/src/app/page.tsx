import {Header} from "./(header)";
import {HeroSection} from "./(hero)";

const Home = async () => (
	<>
		<Header isAbsolute />
		<main>
			<HeroSection />
		</main>
	</>
);

export default Home;
