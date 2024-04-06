import SideBar from "../sidebar/SideBar";
import "./navbars.scss";
import { motion } from "framer-motion";

const Navbars = () => {
	return (
		<div className="navbar">
			<SideBar />
			<div className="wrapper">
				<motion.span
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}>
					Jishnay Nair
				</motion.span>
				<div className="social">
					<motion.a
						href="https://www.linkedin.com/in/jishnay-nair-5aa043244/"
						whileHover={{ scale: 2, rotate: 360 }}
						whileTap={{
							scale: 0.8,
							rotate: -360,
							borderRadius: "100%",
						}}>
						<img src="/linkedin.png" alt="" />
					</motion.a>
					<motion.a
						href="https://github.com/Jish261203"
						whileHover={{ scale: 2, rotate: 360 }}
						whileTap={{
							scale: 0.8,
							rotate: -360,
							borderRadius: "100%",
						}}>
						<img src="/github.png" alt="" />
					</motion.a>
					<motion.a
						href="#"
						whileHover={{ scale: 2, rotate: 360 }}
						whileTap={{
							scale: 0.8,
							rotate: -360,
							borderRadius: "100%",
						}}>
						<img src="/instagram.png" alt="" />
					</motion.a>
					<motion.a
						href="#"
						whileHover={{ scale: 2, rotate: 360 }}
						whileTap={{
							scale: 0.8,
							rotate: -360,
							borderRadius: "100%",
						}}>
						<img src="/gmail.png" alt="" />
					</motion.a>
				</div>
			</div>
		</div>
	);
};

export default Navbars;
