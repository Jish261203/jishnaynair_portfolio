import { useRef } from "react";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import { motion, useScroll, useTransform } from "framer-motion";

const Single = ({ item }) => {
	const handleLiveDemoClick = () => {
		window.location.href = item.liveDemo;
	};

	const handleGithubClick = () => {
		window.location.href = item.github;
	};

	const ref = useRef();
	const { scrollYProgress } = useScroll({ target: ref });
	const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

	return (
		<CardContainer containerClassName="my-10">
			<CardBody className="bg-gray-50 dark:bg-black rounded-xl p-6 border w-auto sm:w-[30rem] h-auto">
				<CardItem
					translateZ={50}
					className="text-xl font-bold text-neutral-600 dark:text-white">
					{item.title}
				</CardItem>
				<CardItem
					as="p"
					translateZ={60}
					className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
					{item.desc}
				</CardItem>
				<CardItem
					translateZ={100}
					rotateX={20}
					rotateZ={-10}
					className="w-full mt-4">
					<img
						src={item.image}
						alt={item.title}
						className="h-60 w-full object-cover rounded-xl shadow-xl"
					/>
				</CardItem>
				<motion.div className="textContainer mt-4" style={{ y }}>
					<div className="tech flex gap-2 mt-4">
						{item.icons.map((icon, index) => (
							<CardItem
								key={index}
								translateZ={20}
								translateX={index * 10}
								className="tech-icon">
								<img
									src={icon.img}
									alt={icon.name}
									height={icon.height}
									width={icon.width}
								/>
							</CardItem>
						))}
					</div>
					<div className="button-container flex justify-between mt-6">
						<CardItem
							translateZ={20}
							translateX={-40}
							as="button"
							onClick={handleLiveDemoClick}
							className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
							Live Demo
						</CardItem>
						<CardItem
							translateZ={20}
							translateX={40}
							as="button"
							onClick={handleGithubClick}
							className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black">
							GitHub
						</CardItem>
					</div>
				</motion.div>
			</CardBody>
		</CardContainer>
	);
};

export default Single;
