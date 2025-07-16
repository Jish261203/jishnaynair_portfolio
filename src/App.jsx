import "./app.scss";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Navbars from "./components/navbar/Navbars";
// import Parallax from "./components/parallax/Parallax";
import Portfolio from "./components/portfolio/Portfolio";
import Skills from "./components/skills/Skills";


const App = () => {
	return (
		<div>
			<Cursor />
			<section id="HomePage">
				<Navbars />
				<Hero />
			</section>
			<section id="About">
				<About />
			</section>
			<section id="Skills">
				<Skills />
			</section>
			<section id="Portfolio">
				<Portfolio />
			</section>
			<section id="Contact">
				<Contact />
			</section>
		</div>
	);
};

export default App;
