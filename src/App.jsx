import "./app.scss"
import Hero from "./components/hero/Hero";
import Navbars from "./components/navbar/Navbars";
import Parallax from "./components/parallax/Parallax";

const App = () => {
  return (
		<div>
			<section id="HomePage">
				<Navbars />
				<Hero />
			</section>
			<section id="About">
				<Parallax type="about" />
			</section>
			<section>About</section>
			<section id="Skills">
				<Parallax type="skills" />
			</section>
			<section>Skills And Technologies</section>
			<section id="Portfolio">
				<Parallax type="portfolio" />
			</section>
			<section>Portfolio1</section>
			<section>Portfolio2</section>
			<section>Portfolio3</section>
			<section id="Contact">Contact</section>
		</div>
	);
};

export default App;
