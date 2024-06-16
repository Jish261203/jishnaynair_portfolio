import "./skills.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { SkillsData } from "./skillsData";

const Skills = () => {
	return (
		<div className="skills">
			<div className="wrapper">
				<div className="innerskill">
					<h1>
						Skills <span> & </span>
						Technologies
					</h1>
					<p>Driving Progress with Expertise in Emerging Technologies</p>
				</div>
				<Swiper
					slidesPerView={5}
					loop={true}
					autoplay={{
						delay: 1,
						disableOnInteraction: false,
					}}
					speed={6000}
					modules={[Autoplay]}
					className="slider"
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						480: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						640: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
						768: {
							slidesPerView: 4,
							spaceBetween: 40,
						},
						1024: {
							slidesPerView: 5,
							spaceBetween: 50,
						},
					}}>
					{SkillsData.map((skill, index) => (
						<SwiperSlide key={index}>
							<img
								src={skill.Image}
								alt={skill.name}
								width={skill.width}
								height={skill.height}
							/>
						</SwiperSlide>
					))}
				</Swiper>

				<Swiper
					slidesPerView={5}
					loop={true}
					autoplay={{
						delay: 0,
						disableOnInteraction: false,
						reverseDirection: true,
					}}
					speed={6000}
					modules={[Autoplay]}
					className="slider"
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						480: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						640: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
						768: {
							slidesPerView: 4,
							spaceBetween: 40,
						},
						1024: {
							slidesPerView: 5,
							spaceBetween: 50,
						},
					}}>
					{SkillsData.map((skill, index) => (
						<SwiperSlide key={index}>
							<img
								src={skill.Image}
								alt={skill.name}
								width={skill.width}
								height={skill.height}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Skills;
