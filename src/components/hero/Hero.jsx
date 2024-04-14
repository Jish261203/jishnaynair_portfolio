import { motion } from "framer-motion";
import "./hero.scss";
import ParticlesContainer from "../particles/ParticlesContainer";

const textVariants = {
    intial: {
        x: -500,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.1,
        },
    },

    scrollButton: {
        opacity: 0,
        y: 10,
        transition: {
            duration: 2,
            repeat:Infinity
        }
    }
};

const Hero = () => {	

	const scrolltoProjects = () => {
		const projectSection = document.getElementById("Portfolio");
		if (projectSection) {
			projectSection.scrollIntoView({behavior:"smooth"})
		}
	}
	const scrolltoAbout = () => {
		const aboutSection = document.getElementById("About");
		if (aboutSection) {
			aboutSection.scrollIntoView({behavior:"smooth"})
		}
	}

	const scrollToContact = () => {
		const contactSection = document.getElementById("Contact");
		if (contactSection) {
			contactSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="hero">
			<div className="wrapper">
				<motion.div
					className="textContainer"
					variants={textVariants}
					initial="intial"
					animate="animate">
					<motion.h2 variants={textVariants}>Jishnay Nair</motion.h2>
					<motion.h1 variants={textVariants}>
						Web Developer & UX/UI Designer
					</motion.h1>
					<motion.div variants={textVariants} className="buttons">
						<motion.button onClick={scrolltoProjects} variants={textVariants}>
							See the Latest Works
						</motion.button>
						<motion.button onClick={scrollToContact} variants={textVariants}>
							Contact Me
						</motion.button>
					</motion.div>
					<motion.img
						variants={textVariants}
						animate="scrollButton"
						src="/scroll.png"
						alt="scroll"
						onClick={scrolltoAbout}
						style={{ cursor: "pointer" }}
					/>
				</motion.div>
			</div>
			<ParticlesContainer />

			<div className="imageContainer">
				<img src="/hero1.png" alt="" />
			</div>
		</div>
	);
};

export default Hero;
