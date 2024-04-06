import { useRef } from "react";
import "./portfolio.scss";
import { Projects } from "./projects";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Single = ({ item }) => {
	const handleLiveDemoClick = () => {
		window.location.href = item.liveDemo;
	};

	const handleGithubClick = () => {
		window.location.href = item.github;
	};
	const ref = useRef();
	const { scrollYProgress } = useScroll({
		target: ref,
	});

	const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

	return (
		<section>
			<div className="container">
				<div className="wrapper">
					<div className="imageContainer" ref={ref}>
						<img src={item.image} alt="" />
					</div>
					<motion.div className="textContainer" style={{ y }}>
						<h2>{item.title}</h2>
						<p>{item.desc}</p>
						<div className="tech">
							{item.icons.map((icon, index) => (
								<img
									key={index}
									src={icon.img}
									alt={icon.name}
									height={icon.height}
									width={icon.width}
								/>
							))}
						</div>
						<button onClick={handleLiveDemoClick}>Live Demo</button>
						<button onClick={handleGithubClick}>Github</button>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

const Portfolio = () => {
	const ref = useRef();

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["end end", "start start"],
	});

	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
	});

	return (
		<div className="portfolio" id="Portfolio" ref={ref}>
			<div className="progress">
				<h1>Project Showcase</h1>
				<motion.div style={{ scaleX }} className="progressBar"></motion.div>
			</div>
			{Projects.map((item) => (
				<Single item={item} key={item.id} />
			))}
		</div>
	);
};

export default Portfolio;
