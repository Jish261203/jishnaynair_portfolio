import { useRef } from "react";
import "./parallax.scss";
import { motion, useScroll,useTransform } from "framer-motion";

const Parallax = ({ type }) => {
	const ref = useRef()
	
	const { scrollYProgress } = useScroll({
		target: ref,
		offset:["start start","end start"]
	})
	const xBg = useTransform(scrollYProgress, [0, 1], ["-35%", "25%"]);
	const yBg = useTransform(scrollYProgress, [0, 1], ["10%", "-100%"]);
	const iBg = useTransform(scrollYProgress, [0, 1], ["30%", "-50%"]);
	const yStars=useTransform(scrollYProgress,[0,1],["0%","20%"])
	
	let backgroundStyle = {}
	let imageTransform
	switch (type) {
		case "about":
			backgroundStyle = "linear-gradient(180deg,#281937,#07071c)";
			imageTransform=yBg
			break;
		case "skills":
			backgroundStyle = "linear-gradient(180deg,#0c0414, #532c79bd)";
			imageTransform=xBg

			break;
		case "portfolio":
			backgroundStyle = "linear-gradient(180deg, #532c79bd, #0c0414)";
			imageTransform = iBg;
			break;
		
	}
	return (
		<div className="parallax" ref={ref} style={{ background: backgroundStyle }}>
			{type == "about" && (
				<motion.img
					style={{ x: imageTransform, y: imageTransform }}
					src="/loader.png"
					alt=""
					className="moon"
				/>
			)}
			{type == "skills" && (
				<motion.img
					src="/astro1.png"
					alt=""
					className="moon"
					style={{ x: imageTransform, y: imageTransform }}
				/>
			)}
			{type == "portfolio" && (
				<motion.img
					src="/astro2.png"
					alt=""
					className="moon"
					style={{ x: imageTransform, y: imageTransform }}
				/>
			)}
			<motion.div className="mountain"></motion.div>
			<motion.div style={{ x: yStars }} className="stars"></motion.div>
		</div>
	);
};

export default Parallax;
