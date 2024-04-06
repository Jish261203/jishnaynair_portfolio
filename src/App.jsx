import "./app.scss";
import Hero from "./components/hero/Hero";
import Navbars from "./components/navbar/Navbars";
import Parallax from "./components/parallax/Parallax";
import Portfolio from "./components/portfolio/Portfolio";
import Skills from "./components/skills/Skills";

const App = () => {
	return (
		<div>
			<section id="HomePage">
				<Navbars />
				<Hero />
			</section>
			<section>
				<Parallax type="about" />
			</section>
			<section id="About">About</section>
			<section>
				<Parallax type="skills" />
			</section>
			<section id="Skills">
				<Skills />
			</section>
			<section >
				<Parallax type="portfolio" />
			</section>
			<Portfolio/>
			<section id="Contact">Contact</section>
		</div>
	);
};

export default App;
