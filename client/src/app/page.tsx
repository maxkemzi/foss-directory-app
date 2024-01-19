import {Header} from "./(header)";
import {HeroSection} from "./(hero)";

const Home = async () => {
	return (
		<>
			<Header isAbsolute />
			<main>
				<HeroSection />
			</main>
		</>
	);
};

export default Home;
