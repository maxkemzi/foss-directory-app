import {Header} from "#src/widgets/Header";
import {HeroSection} from "#src/widgets/HeroSection";

const Home = () => {
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
